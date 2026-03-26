import {
  Injectable, NotFoundException, BadRequestException, ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facturacion } from '../../entities/entities_facturacion/facturacion.entity';
import { ConsumoServicio } from '../../entities/entities_facturacion/consumo-servicio.entity';
import { Socio } from '../../entities/entities_socios/socio.entity';
import { WellnessService } from '../../entities/entities_wellness_services/wellness.entity';
import { CreateConsumoDto } from '../../dtos/dto_facturacion/create-consumo.dto';
import { GenerarFacturaDto } from '../../dtos/dto_facturacion/generar-factura.dto';
import { UpdateConsumoDto } from '../../dtos/dto_facturacion/update-consumo.dto';
import { UpdateFacturaDto } from '../../dtos/dto_facturacion/update-factura.dto';
import { Plan } from '../../entities/entities_planes/plan.entity';

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
  ) { }

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

  async updateConsumo(id: number, dto: UpdateConsumoDto): Promise<ConsumoServicio> {
    const consumo = await this.consumoRepo.findOne({ where: { id } });
    if (!consumo) throw new NotFoundException(`Consumo #${id} no encontrado`);

    if (dto.socioId) {
      const socio = await this.socioRepo.findOne({ where: { id: dto.socioId } });
      if (!socio) throw new NotFoundException(`Socio #${dto.socioId} no encontrado`);
      consumo.socio = socio;
    }
    if (dto.servicioId) {
      const servicio = await this.servicioRepo.findOne({ where: { id: dto.servicioId } });
      if (!servicio) throw new NotFoundException(`Servicio #${dto.servicioId} no encontrado`);
      consumo.servicio = servicio;
      consumo.precioCobrado = servicio.price;
    }
    if (dto.fechaConsumo) consumo.fechaConsumo = new Date(dto.fechaConsumo);
    if (dto.observaciones !== undefined) consumo.observaciones = dto.observaciones;

    return this.consumoRepo.save(consumo);
  }

  async removeConsumo(id: number): Promise<{ message: string }> {
    const consumo = await this.consumoRepo.findOne({ where: { id } });
    if (!consumo) throw new NotFoundException(`Consumo #${id} no encontrado`);
    await this.consumoRepo.remove(consumo);
    return { message: `Consumo #${id} eliminado correctamente` };
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

  async updateFactura(id: number, dto: UpdateFacturaDto): Promise<Facturacion> {
    const factura = await this.facturaRepo.findOne({ where: { id } });
    if (!factura) throw new NotFoundException(`Factura #${id} no encontrada`);

    if (dto.socioId) {
      const socio = await this.socioRepo.findOne({ where: { id: dto.socioId } });
      if (!socio) throw new NotFoundException(`Socio #${dto.socioId} no encontrado`);
      factura.socio = socio;
    }
    if (dto.periodoMes) factura.periodoMes = dto.periodoMes;
    if (dto.periodoAnio) factura.periodoAnio = dto.periodoAnio;

    return this.facturaRepo.save(factura);
  }

  async removeFactura(id: number): Promise<{ message: string }> {
    const factura = await this.facturaRepo.findOne({ where: { id } });
    if (!factura) throw new NotFoundException(`Factura #${id} no encontrada`);
    await this.facturaRepo.remove(factura);
    return { message: `Factura #${id} eliminada correctamente` };
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