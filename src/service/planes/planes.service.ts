import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../../entities/entities_planes/plan.entity';
import { CreatePlanDto } from '../../dtos/dto_plan/create-plan.dto';
import { UpdatePlanDto } from '../../dtos/dto_plan/update-plan.dto';

@Injectable()
export class PlanesService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepo: Repository<Plan>,
  ) {}

  async create(dto: CreatePlanDto): Promise<Plan> {
    const existe = await this.planRepo.findOne({ where: { nombre: dto.nombre } });
    if (existe) throw new ConflictException(`Ya existe un plan con el nombre "${dto.nombre}"`);
    return this.planRepo.save(this.planRepo.create(dto));
  }

  findAll(): Promise<Plan[]> {
    return this.planRepo.find({ order: { costoMensual: 'ASC' } });
  }

  async findOne(id: number): Promise<Plan> {
    const plan = await this.planRepo.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`Plan #${id} no encontrado`);
    return plan;
  }

  async update(id: number, dto: UpdatePlanDto): Promise<Plan> {
    const plan = await this.findOne(id);
    Object.assign(plan, dto);
    return this.planRepo.save(plan);
  }

  async remove(id: number): Promise<{ message: string }> {
    const plan = await this.findOne(id);
    await this.planRepo.remove(plan);
    return { message: `Plan #${id} eliminado correctamente` };
  }
}