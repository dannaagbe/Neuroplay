import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { EstadisticaUsuarioService } from './estadistica-usuario.service';
import { EstadisticaUsuario } from './estadistica-usuario.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocenteGuard } from '../auth/docente.guard';
import { UserRole } from '../users/user-role.enum';

@Controller('estadistica-usuario')
@UseGuards(JwtAuthGuard)
export class EstadisticaUsuarioController {
  constructor(
    private readonly estadisticaUsuarioService: EstadisticaUsuarioService,
  ) {}

  @Post()
  @UseGuards(DocenteGuard)
  create(@Body() estadistica: Partial<EstadisticaUsuario>) {
    return this.estadisticaUsuarioService.create(estadistica);
  }

  @Get()
  async findAll(@Req() req: any) {
    if (req.user.rol === UserRole.DOCENTE) {
      return this.estadisticaUsuarioService.findAll();
    } else {
      return this.estadisticaUsuarioService.findByUserId(req.user.id);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const estadistica = await this.estadisticaUsuarioService.findOne(+id);
    if (
      req.user.rol !== UserRole.DOCENTE &&
      estadistica.usuarioId !== req.user.id
    ) {
      throw new ForbiddenException('Solo puedes ver tus propias estadísticas');
    }
    return estadistica;
  }

  @Get('usuario/:usuarioId')
  async findByUserId(@Param('usuarioId') usuarioId: string, @Req() req: any) {
    if (req.user.rol !== UserRole.DOCENTE && +usuarioId !== req.user.id) {
      throw new ForbiddenException('Solo puedes ver tus propias estadísticas');
    }
    return this.estadisticaUsuarioService.findByUserId(+usuarioId);
  }

  @Patch(':id')
  @UseGuards(DocenteGuard)
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<EstadisticaUsuario>,
  ) {
    return this.estadisticaUsuarioService.update(+id, updateData);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard)
  remove(@Param('id') id: string) {
    return this.estadisticaUsuarioService.remove(+id);
  }
}
