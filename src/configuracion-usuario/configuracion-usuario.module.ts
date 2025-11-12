import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionUsuario } from './configuracion-usuario.entity';
import { ConfiguracionUsuarioService } from './configuracion-usuario.service';
import { ConfiguracionUsuarioController } from './configuracion-usuario.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConfiguracionUsuario]), AuthModule],
  controllers: [ConfiguracionUsuarioController],
  providers: [ConfiguracionUsuarioService],
  exports: [ConfiguracionUsuarioService],
})
export class ConfiguracionUsuarioModule {}
