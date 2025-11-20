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
import { CreateActividadDto } from './dtos/create-actividad.dto';
import { UpdateActividadDto } from './dtos/update-actividad.dto';

@Controller('actividad')
@UseGuards(JwtAuthGuard)
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  @UseGuards(DocenteGuard)
  create(@Body() createActividadDto: CreateActividadDto) {
    return this.actividadService.create(createActividadDto);
  }

  @Get()
  findAll(
    @Query('tipoId') tipoId?: string,
    @Query('nivelDificultadId') nivelDificultadId?: string,
  ) {
    return this.actividadService.findAll(
      tipoId ? +tipoId : undefined,
      nivelDificultadId ? +nivelDificultadId : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actividadService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(DocenteGuard)
  update(@Param('id') id: string, @Body() updateActividadDto: UpdateActividadDto) {
    return this.actividadService.update(+id, updateActividadDto);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard)
  remove(@Param('id') id: string) {
    return this.actividadService.remove(+id);
  }
}
