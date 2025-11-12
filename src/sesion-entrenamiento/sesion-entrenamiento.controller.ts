import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SesionEntrenamientoService } from './sesion-entrenamiento.service';
import { SesionEntrenamiento } from './sesion-entrenamiento.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('sesion-entrenamiento')
@UseGuards(JwtAuthGuard)
export class SesionEntrenamientoController {
  constructor(
    private readonly sesionEntrenamientoService: SesionEntrenamientoService,
  ) {}

  @Post()
  create(@Body() sesion: Partial<SesionEntrenamiento>) {
    return this.sesionEntrenamientoService.create(sesion);
  }

  @Get()
  findAll() {
    return this.sesionEntrenamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesionEntrenamientoService.findOne(+id);
  }

  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.sesionEntrenamientoService.findByUsuario(+usuarioId);
  }

  @Patch(':id/finalizar')
  finalizarSesion(@Param('id') id: string) {
    return this.sesionEntrenamientoService.finalizarSesion(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<SesionEntrenamiento>,
  ) {
    return this.sesionEntrenamientoService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sesionEntrenamientoService.remove(+id);
  }
}
