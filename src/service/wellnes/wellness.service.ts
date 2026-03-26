import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WellnessService } from '../../entities/entities_wellness_services/wellness.entity';
import { CreateWellnessServiceDto } from '../../dtos/dto_wellness_services/create-wellness-service.dto';
import { UpdateWellnessServiceDto } from '../../dtos/dto_wellness_services/update-wellness-service.dto';

@Injectable()
export class WellnessServicesService {
  constructor(
    @InjectRepository(WellnessService)
    private readonly wellnessRepo: Repository<WellnessService>,
  ) { }

  async create(dto: CreateWellnessServiceDto): Promise<WellnessService> {
    const service = this.wellnessRepo.create(dto);
    return await this.wellnessRepo.save(service);
  }

  async findAll(): Promise<WellnessService[]> {
    return await this.wellnessRepo.find();
  }

  async findAllActive(): Promise<WellnessService[]> {
    return await this.wellnessRepo.find({ where: { isActive: true } });
  }

  async findOne(id: number): Promise<WellnessService> {
    const service = await this.wellnessRepo.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Servicio con id ${id} no encontrado`);
    }
    return service;
  }

  async update(
    id: number,
    dto: UpdateWellnessServiceDto,
  ): Promise<WellnessService> {
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
