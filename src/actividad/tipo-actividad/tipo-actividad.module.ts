import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoActividad } from '../tipo-actividad.entity';
import { TipoActividadService } from './tipo-actividad.service';
import { TipoActividadController } from './tipo-actividad.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TipoActividad]), AuthModule],
  controllers: [TipoActividadController],
  providers: [TipoActividadService],
  exports: [TipoActividadService],
})
export class TipoActividadModule {}