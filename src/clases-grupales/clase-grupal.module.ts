import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseGrupal } from './clase-grupal.entity';
import { ClaseGrupalService } from './clase-grupal.service';
import { ClaseGrupalController } from './clase-grupal.controller';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClaseGrupal]),
    StaffModule,
  ],
  providers: [ClaseGrupalService],
  controllers: [ClaseGrupalController],
})
export class ClaseGrupalModule {}
