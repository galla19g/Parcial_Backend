import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseGrupal } from './clase-grupal.entity';
import { CreateClaseGrupalDto } from './dto/create-clase-grupal.dto';
import { StaffService } from '../staff/staff.service';

@Injectable()
export class ClaseGrupalService {
  constructor(
    @InjectRepository(ClaseGrupal)
    private readonly claseGrupalRepository: Repository<ClaseGrupal>,
    private readonly staffService: StaffService,
  ) {}

  async create(createClaseGrupalDto: CreateClaseGrupalDto): Promise<ClaseGrupal> {
    const { entrenadorId, ...claseData } = createClaseGrupalDto;
    
    const entrenador = await this.staffService.findOne(entrenadorId);
    if (!entrenador) {
      throw new BadRequestException('Entrenador no encontrado');
    }

    const clase = this.claseGrupalRepository.create({
      ...claseData,
      entrenador,
    });
    
    return await this.claseGrupalRepository.save(clase);
  }

  async findAll(): Promise<ClaseGrupal[]> {
    return await this.claseGrupalRepository.find({
      relations: ['entrenador'],
    });
  }

  async findOne(id: number): Promise<ClaseGrupal> {
    return await this.claseGrupalRepository.findOne({
      where: { id },
      relations: ['entrenador'],
    });
  }

  async registrarSocio(id: number): Promise<ClaseGrupal> {
    const clase = await this.findOne(id);
    if (!clase) {
      throw new BadRequestException('Clase no encontrada');
    }

    if (clase.cupoActual >= clase.cupoMaximo) {
      throw new BadRequestException('No se pueden inscribir más socios de los permitidos por el cupo');
    }

    clase.cupoActual += 1;
    return await this.claseGrupalRepository.save(clase);
  }
}
