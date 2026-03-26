import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from '../../entities/entities_planes/plan.entity';
import { PlanesService } from '../../service/planes/planes.service';
import { PlanesController } from '../../controller/planes/planes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanesController],
  providers: [PlanesService],
  exports: [PlanesService],
})
export class PlanesModule {}