import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StaffModule } from './staff/staff.module';
import { ClaseGrupalModule } from './clases-grupales/clase-grupal.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    StaffModule,
    ClaseGrupalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
