import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { EstadisticaUsuarioService } from './estadistica-usuario.service';
import { EstadisticaUsuario } from './estadistica-usuario.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocenteGuard } from '../auth/docente.guard';
import { UserRole } from '../users/user-role.enum';
import { CreateEstadisticaUsuarioDto } from './dtos/create-estadistica-usuario.dto';
import { UpdateEstadisticasUsuarioDTO } from './dtos/update-estadisticas-usuario.dto';
import { GetUserRole } from '../auth/get-user-role.decorator';
import { GetUserId } from '../auth/get-user-id.decorator';

@Controller('estadistica-usuario')
@UseGuards(JwtAuthGuard)
export class EstadisticaUsuarioController {
  constructor(
    private readonly estadisticaUsuarioService: EstadisticaUsuarioService,
  ) {}

  @Post()
  @UseGuards(DocenteGuard)
  create(@Body() estadistica: CreateEstadisticaUsuarioDto) {
    return this.estadisticaUsuarioService.create(estadistica);
  }

  @Get()
  async findAll(@GetUserRole() role: UserRole, @GetUserId() userId: number) {
    if (role === UserRole.DOCENTE) {
      return this.estadisticaUsuarioService.findAll();
    } else {
      return this.estadisticaUsuarioService.findByUserId(userId);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUserRole() role: UserRole, @GetUserId() userId: number) {
    const estadistica = await this.estadisticaUsuarioService.findOne(+id);
    if (
      role !== UserRole.DOCENTE &&
      estadistica.usuarioId !== userId
    ) {
      throw new ForbiddenException('Solo puedes ver tus propias estadísticas');
    }
    return estadistica;
  }

  @Get('usuario/:usuarioId')
  async findByUserId(@Param('usuarioId') usuarioId: string, @GetUserRole() role: UserRole, @GetUserId() userId: number) {
    if (role !== UserRole.DOCENTE && +usuarioId !== userId) {
      throw new ForbiddenException('Solo puedes ver tus propias estadísticas');
    }
    return this.estadisticaUsuarioService.findByUserId(+usuarioId);
  }

  @Patch(':id')
  @UseGuards(DocenteGuard)
  update(
    @Param('id') id: string,
    @Body() updateData: UpdateEstadisticasUsuarioDTO,
  ) {
    return this.estadisticaUsuarioService.update(+id, updateData);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard)
  remove(@Param('id') id: string) {
    return this.estadisticaUsuarioService.remove(+id);
  }
}
