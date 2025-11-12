import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadisticaUsuario } from './estadistica-usuario.entity';
import { EstadisticaUsuarioService } from './estadistica-usuario.service';
import { EstadisticaUsuarioController } from './estadistica-usuario.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([EstadisticaUsuario]), AuthModule],
  controllers: [EstadisticaUsuarioController],
  providers: [EstadisticaUsuarioService],
  exports: [EstadisticaUsuarioService],
})
export class EstadisticaUsuarioModule {}
