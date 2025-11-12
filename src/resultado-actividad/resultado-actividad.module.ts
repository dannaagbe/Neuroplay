import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoActividad } from './resultado-actividad.entity';
import { ResultadoActividadService } from './resultado-actividad.service';
import { ResultadoActividadController } from './resultado-actividad.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoActividad]), AuthModule],
  controllers: [ResultadoActividadController],
  providers: [ResultadoActividadService],
  exports: [ResultadoActividadService],
})
export class ResultadoActividadModule {}
