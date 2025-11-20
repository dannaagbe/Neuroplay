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
import { PreguntaService } from './pregunta.service';
import { Pregunta } from './pregunta.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocenteGuard } from '../auth/docente.guard';
import { CreatePreguntaDto } from './dtos/create-pregunta.dto';
import { UpdatePreguntaDto } from './dtos/update-pregunta.dto';

@Controller('pregunta')
@UseGuards(JwtAuthGuard)
export class PreguntaController {
  constructor(private readonly preguntaService: PreguntaService) {}

  @Post()
  @UseGuards(DocenteGuard)
  create(@Body() createPreguntaDto: CreatePreguntaDto) {
    return this.preguntaService.create(createPreguntaDto);
  }

  @Get()
  findAll() {
    return this.preguntaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preguntaService.findOne(+id);
  }

  @Get('actividad/:actividadId')
  findByActividad(@Param('actividadId') actividadId: string) {
    return this.preguntaService.findByActividad(+actividadId);
  }

  @Patch(':id')
  @UseGuards(DocenteGuard)
  update(@Param('id') id: string, @Body() updatePreguntaDto: UpdatePreguntaDto) {
    return this.preguntaService.update(+id, updatePreguntaDto);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard)
  remove(@Param('id') id: string) {
    return this.preguntaService.remove(+id);
  }
}
