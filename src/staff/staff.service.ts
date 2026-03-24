import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) {}

  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const specialty = await this.specialtyRepository.findOneBy({ id: createStaffDto.specialtyId });
    if (!specialty) {
      throw new NotFoundException(`Specialty with ID ${createStaffDto.specialtyId} not found`);
    }

    const staff = this.staffRepository.create({
      ...createStaffDto,
      specialty,
    });

    return this.staffRepository.save(staff);
  }

  findAll(): Promise<Staff[]> {
    return this.staffRepository.find({ relations: ['specialty'] });
  }

  findOne(id: number): Promise<Staff> {
    return this.staffRepository.findOne({ 
      where: { id },
      relations: ['specialty'] 
    });
  }
}
