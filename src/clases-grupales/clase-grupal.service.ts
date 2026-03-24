import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseGrupal } from './entities/clase-grupal.entity';
import { CreateClaseGrupalDto } from './dto/create-clase-grupal.dto';
import { UpdateClaseGrupalDto } from './dto/update-clase-grupal.dto';
import { StaffService } from '../staff/staff.service';

@Injectable()
export class ClaseGrupalService {
  constructor(
    @InjectRepository(ClaseGrupal)
    private readonly claseGrupalRepository: Repository<ClaseGrupal>,
    private readonly staffService: StaffService,
  ) { }

  async create(createClaseGrupalDto: CreateClaseGrupalDto): Promise<ClaseGrupal> {
    const { trainerId, ...claseData } = createClaseGrupalDto;

    const entrenador = await this.staffService.findOne(trainerId);
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
    const clase = await this.claseGrupalRepository.findOne({
      where: { id },
      relations: ['entrenador'],
    });
    if (!clase) {
      throw new NotFoundException(`Clase Grupal con ID ${id} no encontrada`);
    }
    return clase;
  }

  async update(id: number, updateClaseGrupalDto: UpdateClaseGrupalDto): Promise<ClaseGrupal> {
    const { trainerId, ...claseData } = updateClaseGrupalDto;
    const clase = await this.findOne(id);

    if (trainerId) {
      const entrenador = await this.staffService.findOne(trainerId);
      if (!entrenador) {
        throw new BadRequestException('Entrenador no encontrado');
      }
      clase.entrenador = entrenador;
    }

    Object.assign(clase, claseData);
    return await this.claseGrupalRepository.save(clase);
  }

  async remove(id: number): Promise<void> {
    const clase = await this.findOne(id);
    await this.claseGrupalRepository.remove(clase);
  }

  async registrarSocio(id: number): Promise<ClaseGrupal> {
    const clase = await this.findOne(id);

    if (clase.cupoActual >= clase.cupoMaximo) {
      throw new BadRequestException('No se pueden inscribir más socios de los permitidos por el cupo');
    }

    clase.cupoActual += 1;
    return await this.claseGrupalRepository.save(clase);
  }
}
