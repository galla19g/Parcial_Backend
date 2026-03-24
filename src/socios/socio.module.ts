
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocioService } from '../socios/socio.service';
import { SocioController } from './socio.controller';
import { Socio } from './entities/socio.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Socio])],
  controllers: [SocioController],
  providers: [SocioService],
  exports: [SocioService, TypeOrmModule], 
})
export class SocioModule {}
