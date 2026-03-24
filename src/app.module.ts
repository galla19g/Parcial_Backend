import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WellnessModule } from './wellness/wellness.module';
import { DatabaseModule } from './database/database.module';
import { StaffModule } from './staff/staff.module';
import { ClaseGrupalModule } from './clases-grupales/clase-grupal.module';
import { SocioModule } from './socios/socio.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    WellnessModule, DatabaseModule, StaffModule, ClaseGrupalModule, SocioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
