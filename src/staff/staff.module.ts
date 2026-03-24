import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Specialty } from './entities/specialty.entity';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Specialty])],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService, TypeOrmModule], // Exporting for use in Group Classes
})
export class StaffModule {}
