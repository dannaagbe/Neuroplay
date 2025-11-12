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
import { ResultadoActividadService } from './resultado-actividad.service';
import { ResultadoActividad } from './resultado-actividad.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocenteGuard } from '../auth/docente.guard';
import { UserRole } from '../users/user-role.enum';

interface RequestWithUser extends Request {
  user: {
    id: number;
    rol: UserRole;
  };
}

@Controller('resultado-actividad')
@UseGuards(JwtAuthGuard)
export class ResultadoActividadController {
  constructor(
    private readonly resultadoActividadService: ResultadoActividadService,
  ) {}

  @Post()
  create(@Body() resultado: Partial<ResultadoActividad>) {
    return this.resultadoActividadService.create(resultado);
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    if (req.user.rol === UserRole.DOCENTE) {
      return this.resultadoActividadService.findAll();
    } else {
      return this.resultadoActividadService.findByUsuario(req.user.id);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const resultado = await this.resultadoActividadService.findOne(+id);
    if (
      req.user.rol !== UserRole.DOCENTE &&
      resultado.usuarioId !== req.user.id
    ) {
      throw new ForbiddenException('Solo puedes ver tus propios resultados');
    }
    return resultado;
  }

  @Get('usuario/:usuarioId')
  async findByUsuario(
    @Param('usuarioId') usuarioId: string,
    @Req() req: RequestWithUser,
  ) {
    if (req.user.rol !== UserRole.DOCENTE && +usuarioId !== req.user.id) {
      throw new ForbiddenException('Solo puedes ver tus propios resultados');
    }
    return this.resultadoActividadService.findByUsuario(+usuarioId);
  }

  @Get('sesion/:sesionId')
  async findBySesion(
    @Param('sesionId') sesionId: string,
    @Req() req: RequestWithUser,
  ) {
    // Los estudiantes pueden ver resultados de sesiones que les pertenecen
    const resultados =
      await this.resultadoActividadService.findBySesion(+sesionId);
    if (req.user.rol !== UserRole.DOCENTE) {
      // Filtrar solo los resultados del usuario actual
      return resultados.filter((r) => r.usuarioId === req.user.id);
    }
    return resultados;
  }

  @Get('actividad/:actividadId')
  async findByActividad(
    @Param('actividadId') actividadId: string,
    @Req() req: RequestWithUser,
  ) {
    const resultados =
      await this.resultadoActividadService.findByActividad(+actividadId);

    if (req.user.rol !== UserRole.DOCENTE) {
      // Filtrar solo los resultados del usuario actual
      return resultados.filter((r) => r.usuarioId === req.user.id);
    }
    return resultados;
  }

  @Patch(':id')
  @UseGuards(DocenteGuard)
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<ResultadoActividad>,
  ) {
    return this.resultadoActividadService.update(+id, updateData);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard)
  remove(@Param('id') id: string) {
    return this.resultadoActividadService.remove(+id);
  }
}
