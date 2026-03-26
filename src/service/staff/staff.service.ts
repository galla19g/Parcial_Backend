import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../../entities/entities_staff/staff.entity';
import { CreateStaffDto } from '../../dtos/dto_staff/create-staff.dto';
import { Specialty } from '../../entities/entities_staff/specialty.entity';
import { UpdateStaffDto } from '../../dtos/dto_staff/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) { }

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

  async findOne(id: number): Promise<Staff> {
    const staff = await this.staffRepository.findOne({
      where: { id },
      relations: ['specialty']
    });
    if (!staff) {
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    }
    return staff;
  }

  async update(id: number, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    const { specialtyId, ...staffData } = updateStaffDto;
    const staff = await this.findOne(id);

    if (specialtyId) {
      const specialty = await this.specialtyRepository.findOneBy({ id: specialtyId });
      if (!specialty) {
        throw new NotFoundException(`Specialty with ID ${specialtyId} not found`);
      }
      staff.specialty = specialty;
    }

    Object.assign(staff, staffData);
    return this.staffRepository.save(staff);
  }

  async remove(id: number): Promise<void> {
    const staff = await this.findOne(id);
    await this.staffRepository.remove(staff);
  }
}
