import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseGrupal } from '../../entities/entities_clase_grupal/clase-grupal.entity';
import { ClaseGrupalService } from '../../service/clase_grupal/clase-grupal.service';
import { ClaseGrupalController } from '../../controller/clase_grupal/clase-grupal.controller';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClaseGrupal]),
    StaffModule,
  ],
  controllers: [ClaseGrupalController],
  providers: [ClaseGrupalService],
})
export class ClaseGrupalModule { }
