import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NivelDificultadService } from './nivel-dificultad.service';
import { CreateNivelDificultadDto } from './dto/create-nivel-dificultad.dto';
import { UpdateNivelDificultadDto } from './dto/update-nivel-dificultad.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocenteGuard } from '../auth/docente.guard';

@Controller('nivel-dificultad')
@UseGuards(JwtAuthGuard)
export class NivelDificultadController {
  constructor(private readonly nivelDificultadService: NivelDificultadService) {}

  @Post()
  @UseGuards(DocenteGuard)
  create(@Body() createNivelDificultadDto: CreateNivelDificultadDto) {
    return this.nivelDificultadService.create(createNivelDificultadDto);
  }

  @Get()
  findAll() {
    return this.nivelDificultadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelDificultadService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(DocenteGuard)
  update(@Param('id') id: string, @Body() updateNivelDificultadDto: UpdateNivelDificultadDto) {
    return this.nivelDificultadService.update(+id, updateNivelDificultadDto);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard)
  remove(@Param('id') id: string) {
    return this.nivelDificultadService.remove(+id);
  }
}
