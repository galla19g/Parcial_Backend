import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WellnessService } from '../../entities/entities_wellness_services/wellness.entity';
import { WellnessServicesService } from '../../service/wellnes/wellness.service';
import { WellnessController } from '../../controller/wellness_services/wellness.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WellnessService])],
  controllers: [WellnessController],
  providers: [WellnessServicesService],
  exports: [WellnessServicesService],
})
export class WellnessModule {}
