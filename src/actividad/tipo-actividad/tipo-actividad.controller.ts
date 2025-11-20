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
import { TipoActividadService } from './tipo-actividad.service';
import { CreateTipoActividadDto } from './dtos/create-tipo-actividad.dto';
import { UpdateTipoActividadDto } from './dtos/update-tipo-actividad.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { DocenteGuard } from '../../auth/docente.guard';

@Controller('tipo-actividad')
@UseGuards(JwtAuthGuard)
export class TipoActividadController {
  constructor(private readonly tipoActividadService: TipoActividadService) {}

  @Post()
  @UseGuards(DocenteGuard)
  create(@Body() createTipoActividadDto: CreateTipoActividadDto) {
    return this.tipoActividadService.create(createTipoActividadDto);
  }

  @Get()
  findAll() {
    return this.tipoActividadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoActividadService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(DocenteGuard)
  update(@Param('id') id: string, @Body() updateTipoActividadDto: UpdateTipoActividadDto) {
    return this.tipoActividadService.update(+id, updateTipoActividadDto);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard)
  remove(@Param('id') id: string) {
    return this.tipoActividadService.remove(+id);
  }
}