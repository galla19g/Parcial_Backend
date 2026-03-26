import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../../entities/entities_staff/staff.entity';
import { Specialty } from '../../entities/entities_staff/specialty.entity';
import { StaffService } from '../../service/staff/staff.service';
import { StaffController } from '../../controller/staff/staff.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Specialty])],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService, TypeOrmModule], // Exporting for use in Group Classes
})
export class StaffModule {}
