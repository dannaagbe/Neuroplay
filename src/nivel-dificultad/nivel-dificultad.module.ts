import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelDificultadService } from './nivel-dificultad.service';
import { NivelDificultadController } from './nivel-dificultad.controller';
import { NivelDificultad } from './entities/nivel-dificultad.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([NivelDificultad]), AuthModule],
  controllers: [NivelDificultadController],
  providers: [NivelDificultadService],
  exports: [NivelDificultadService],
})
export class NivelDificultadModule {}
