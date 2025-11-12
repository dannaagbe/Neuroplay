import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SesionEntrenamiento } from './sesion-entrenamiento.entity';
import { SesionEntrenamientoService } from './sesion-entrenamiento.service';
import { SesionEntrenamientoController } from './sesion-entrenamiento.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SesionEntrenamiento]), AuthModule],
  controllers: [SesionEntrenamientoController],
  providers: [SesionEntrenamientoService],
  exports: [SesionEntrenamientoService],
})
export class SesionEntrenamientoModule {}
