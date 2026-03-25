import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseGrupal } from './entities/clase-grupal.entity';
import { ClaseGrupalService } from './clase-grupal.service';
import { ClaseGrupalController } from './clase-grupal.controller';
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
