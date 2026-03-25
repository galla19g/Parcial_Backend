import {
  Injectable, NotFoundException, BadRequestException, ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facturacion } from './facturacion.entity';
import { ConsumoServicio } from './consumo-servicio.entity';
import { Socio } from '../socios/entities/socio.entity';
import { WellnessService } from '../wellness/wellness.entity';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { GenerarFacturaDto } from './dto/generar-factura.dto';
import { Plan } from '../planes/plan.entity';

@Injectable()
export class FacturacionService {
  constructor(
    @InjectRepository(Facturacion)
    private readonly facturaRepo: Repository<Facturacion>,

    @InjectRepository(ConsumoServicio)
    private readonly consumoRepo: Repository<ConsumoServicio>,

    @InjectRepository(Socio)
    private readonly socioRepo: Repository<Socio>,

    @InjectRepository(WellnessService)
    private readonly servicioRepo: Repository<WellnessService>,

    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
  ) {}

  // ── Consumos ────────────────────────────────────────────────────────────────

  async registrarConsumo(dto: CreateConsumoDto): Promise<ConsumoServicio> {
    const socio = await this.socioRepo.findOne({ where: { id: dto.socioId } });
    if (!socio) throw new NotFoundException(`Socio #${dto.socioId} no encontrado`);
    if (socio.estadoMembresia !== 'activo') {
      throw new BadRequestException(`El socio #${dto.socioId} no tiene membresía activa`);
    }

    const servicio = await this.servicioRepo.findOne({ where: { id: dto.servicioId } });
    if (!servicio) throw new NotFoundException(`Servicio #${dto.servicioId} no encontrado`);
    if (!servicio.isActive) {
      throw new BadRequestException(`El servicio "${servicio.name}" no está disponible`);
    }

    const consumo = this.consumoRepo.create({
      socio,
      servicio,
      precioCobrado: servicio.price,
      fechaConsumo: dto.fechaConsumo ? new Date(dto.fechaConsumo) : new Date(),
      observaciones: dto.observaciones ?? null,
    });
    return this.consumoRepo.save(consumo);
  }

  getConsumosPorSocio(socioId: number): Promise<ConsumoServicio[]> {
    return this.consumoRepo.find({
      where: { socio: { id: socioId } },
      order: { fechaConsumo: 'DESC' },
    });
  }

  getConsumosPorSocioYMes(socioId: number, mes: number, anio: number): Promise<ConsumoServicio[]> {
    return this.consumoRepo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.socio', 'socio')
      .leftJoinAndSelect('c.servicio', 'servicio')
      .where('socio.id = :socioId', { socioId })
      .andWhere('MONTH(c.fechaConsumo) = :mes', { mes })
      .andWhere('YEAR(c.fechaConsumo) = :anio', { anio })
      .orderBy('c.fechaConsumo', 'DESC')
      .getMany();
  }

  // ── Facturas ────────────────────────────────────────────────────────────────

  async generarFactura(dto: GenerarFacturaDto): Promise<Facturacion> {
    const socio = await this.socioRepo.findOne({ where: { id: dto.socioId } });
    if (!socio) throw new NotFoundException(`Socio #${dto.socioId} no encontrado`);

    // Buscar el plan del socio por su membresía
    // (el compañero de socios deberá vincular el plan — por ahora buscamos por nombre si existe)
    const existente = await this.facturaRepo.findOne({
      where: {
        socio: { id: dto.socioId },
        periodoMes: dto.periodoMes,
        periodoAnio: dto.periodoAnio,
      },
    });
    if (existente) {
      throw new ConflictException(
        `Ya existe factura del socio #${dto.socioId} para ${dto.periodoMes}/${dto.periodoAnio}`,
      );
    }

    const resultado = await this.consumoRepo
      .createQueryBuilder('c')
      .select('COALESCE(SUM(c.precioCobrado), 0)', 'total')
      .where('c.socio.id = :id', { id: dto.socioId })
      .andWhere('MONTH(c.fechaConsumo) = :mes', { mes: dto.periodoMes })
      .andWhere('YEAR(c.fechaConsumo) = :anio', { anio: dto.periodoAnio })
      .getRawOne<{ total: string }>();

    const factura = this.facturaRepo.create({
      socio,
      periodoMes: dto.periodoMes,
      periodoAnio: dto.periodoAnio,
      costoPlan: 0, // Se actualiza cuando el módulo socios vincule el plan
      totalServicios: parseFloat(resultado?.total ?? '0'),
      fechaGeneracion: new Date(),
    });
    return this.facturaRepo.save(factura);
  }

  // ── Endpoint principal requerido ─────────────────────────────────────────────

  async calcularTotalAPagar(socioId: number, mes?: number, anio?: number) {
    const ahora = new Date();
    const periodoMes = mes ?? ahora.getMonth() + 1;
    const periodoAnio = anio ?? ahora.getFullYear();

    const socio = await this.socioRepo.findOne({ where: { id: socioId } });
    if (!socio) throw new NotFoundException(`Socio #${socioId} no encontrado`);

    const consumos = await this.getConsumosPorSocioYMes(socioId, periodoMes, periodoAnio);
    const totalServicios = consumos.reduce((acc, c) => acc + Number(c.precioCobrado), 0);

    return {
      socio: `${socio.nombre} ${socio.apellido}`,
      estado_membresia: socio.estadoMembresia,
      total_servicios: totalServicios,
      periodo: `${String(periodoMes).padStart(2, '0')}/${periodoAnio}`,
      detalle_servicios: consumos,
    };
  }

  findAllFacturas(): Promise<Facturacion[]> {
    return this.facturaRepo.find({ order: { periodoAnio: 'DESC', periodoMes: 'DESC' } });
  }

  async findFacturaById(id: number): Promise<Facturacion> {
    const factura = await this.facturaRepo.findOne({ where: { id } });
    if (!factura) throw new NotFoundException(`Factura #${id} no encontrada`);
    return factura;
  }

  findFacturasPorSocio(socioId: number): Promise<Facturacion[]> {
    return this.facturaRepo.find({
      where: { socio: { id: socioId } },
      order: { periodoAnio: 'DESC', periodoMes: 'DESC' },
    });
  }
}