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
import { ConfiguracionUsuarioService } from './configuracion-usuario.service';
import { ConfiguracionUsuario } from './configuracion-usuario.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateConfiguracionUsuarioDto } from './dtos/create-configuracion-usuario.dto';
import { UpdateConfiguracionUsuarioDto } from './dtos/update-configuracion-usuario.dto';

@Controller('configuracion-usuario')
@UseGuards(JwtAuthGuard)
export class ConfiguracionUsuarioController {
  constructor(
    private readonly configuracionUsuarioService: ConfiguracionUsuarioService,
  ) {}

  @Post()
  create(@Body() createConfiguracionDto: CreateConfiguracionUsuarioDto) {
    return this.configuracionUsuarioService.create(createConfiguracionDto);
  }

  @Get()
  findAll() {
    return this.configuracionUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configuracionUsuarioService.findOne(+id);
  }

  @Get('usuario/:usuarioId')
  findByUserId(@Param('usuarioId') usuarioId: string) {
    return this.configuracionUsuarioService.findByUserId(+usuarioId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfiguracionDto: UpdateConfiguracionUsuarioDto,
  ) {
    return this.configuracionUsuarioService.update(+id, updateConfiguracionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configuracionUsuarioService.remove(+id);
  }
}
