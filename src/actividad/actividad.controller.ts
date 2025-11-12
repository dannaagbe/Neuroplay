import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { Actividad } from './actividad.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocenteGuard } from '../auth/docente.guard';

@Controller('actividad')
@UseGuards(JwtAuthGuard)
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  @UseGuards(DocenteGuard)
  create(@Body() actividad: Partial<Actividad>) {
    return this.actividadService.create(actividad);
  }

  @Get()
  findAll(@Query('tipo') tipo?: string, @Query('nivel') nivel?: string) {
    if (tipo) {
      return this.actividadService.findByTipo(tipo);
    }
    if (nivel) {
      return this.actividadService.findByNivel(nivel);
    }
    return this.actividadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actividadService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(DocenteGuard)
  update(@Param('id') id: string, @Body() updateData: Partial<Actividad>) {
    return this.actividadService.update(+id, updateData);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard)
  remove(@Param('id') id: string) {
    return this.actividadService.remove(+id);
  }
}
