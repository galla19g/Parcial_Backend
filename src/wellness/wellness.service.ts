import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WellnessServiceEntity } from './wellness.entity';
import { CreateWellnessServiceDto } from './dto/create-wellness-service.dto';
import { UpdateWellnessServiceDto } from './dto/update-wellness-service.dto';

@Injectable()
export class WellnessServicesService {
  constructor(
    @InjectRepository(WellnessServiceEntity)
    private readonly wellnessRepo: Repository<WellnessServiceEntity>,
  ) {}

  async create(dto: CreateWellnessServiceDto): Promise<WellnessServiceEntity> {
    const service = this.wellnessRepo.create(dto);
    return await this.wellnessRepo.save(service);
  }

  async findAll(): Promise<WellnessServiceEntity[]> {
    return await this.wellnessRepo.find();
  }

  async findAllActive(): Promise<WellnessServiceEntity[]> {
    return await this.wellnessRepo.find({ where: { isActive: true } });
  }

  async findOne(id: number): Promise<WellnessServiceEntity> {
    const service = await this.wellnessRepo.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }
    return service;
  }

  async update(
    id: number,
    dto: UpdateWellnessServiceDto,
  ): Promise<WellnessServiceEntity> {
    const service = await this.findOne(id);
    Object.assign(service, dto);
    return await this.wellnessRepo.save(service);
  }

  async remove(id: number): Promise<{ message: string }> {
    const service = await this.findOne(id);

    await this.wellnessRepo.remove(service);
    return { message: `Servicio "${service.name}" eliminado correctamente` };
  }
}