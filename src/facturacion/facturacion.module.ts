import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facturacion } from './facturacion.entity';
import { ConsumoServicio } from './consumo-servicio.entity';
import { Socio } from '../socios/entities/socio.entity';
import { WellnessService } from '../wellness/wellness.entity';
import { Plan } from '../planes/plan.entity';
import { FacturacionService } from './facturacion.service';
import { FacturacionController } from './facturacion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Facturacion,
      ConsumoServicio,
      Socio,
      WellnessService,
      Plan,
    ]),
  ],
  controllers: [FacturacionController],
  providers: [FacturacionService],
  exports: [FacturacionService],
})
export class FacturacionModule {}