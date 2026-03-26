import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facturacion } from '../../entities/entities_facturacion/facturacion.entity';
import { ConsumoServicio } from '../../entities/entities_facturacion/consumo-servicio.entity';
import { Socio } from '../../entities/entities_socios/socio.entity';
import { WellnessService } from '../../entities/entities_wellness_services/wellness.entity';
import { Plan } from '../../entities/entities_planes/plan.entity';
import { FacturacionService } from '../../service/facturacion/facturacion.service';
import { FacturacionController } from '../../controller/facturacion/facturacion.controller';

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