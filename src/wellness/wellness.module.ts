import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WellnessServiceEntity } from './wellness.entity';
import { WellnessServicesService } from './wellness.service';
import { WellnessController } from './wellness.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WellnessServiceEntity])],
  controllers: [WellnessController],
  providers: [WellnessServicesService],
  exports: [WellnessServicesService],
})
export class WellnessModule {}