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
import { ResultadoActividadService } from './resultado-actividad.service';
import { ResultadoActividad } from './resultado-actividad.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocenteGuard } from '../auth/docente.guard';
import { UserRole } from '../users/user-role.enum';
import { CreateResultadoActividadDto } from './dtos/create-resultado-actividad.dto';
import { UpdateResultadoActividadDto } from './dtos/update-resultado-actividad.dto';
import { GetUserRole } from '../auth/get-user-role.decorator';
import { GetUserId } from '../auth/get-user-id.decorator';

@Controller('resultado-actividad')
@UseGuards(JwtAuthGuard)
export class ResultadoActividadController {
  constructor(
    private readonly resultadoActividadService: ResultadoActividadService,
  ) {}

  @Post()
  create(@Body() createResultadoDto: CreateResultadoActividadDto) {
    return this.resultadoActividadService.create(createResultadoDto);
  }

  @Get()
  async findAll(@GetUserRole() role: UserRole, @GetUserId() userId: number) {
    if (role === UserRole.DOCENTE) {
      return this.resultadoActividadService.findAll();
    } else {
      return this.resultadoActividadService.findByUsuario(userId);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUserRole() role: UserRole, @GetUserId() userId: number) {
    const resultado = await this.resultadoActividadService.findOne(+id);
    if (
      role !== UserRole.DOCENTE &&
      resultado.usuarioId !== userId
    ) {
      throw new ForbiddenException('Solo puedes ver tus propios resultados');
    }
    return resultado;
  }

  @Get('usuario/:usuarioId')
  async findByUsuario(
    @Param('usuarioId') usuarioId: string,
    @GetUserRole() role: UserRole,
    @GetUserId() userId: number,
  ) {
    if (role !== UserRole.DOCENTE && +usuarioId !== userId) {
      throw new ForbiddenException('Solo puedes ver tus propios resultados');
    }
    return this.resultadoActividadService.findByUsuario(+usuarioId);
  }

  @Get('sesion/:sesionId')
  async findBySesion(
    @Param('sesionId') sesionId: string,
    @GetUserRole() role: UserRole,
    @GetUserId() userId: number,
  ) {
    // Los estudiantes pueden ver resultados de sesiones que les pertenecen
    const resultados =
      await this.resultadoActividadService.findBySesion(+sesionId);
    if (role !== UserRole.DOCENTE) {
      // Filtrar solo los resultados del usuario actual
      return resultados.filter((r) => r.usuarioId === userId);
    }
    return resultados;
  }

  // @Get('actividad/:actividadId')
  // async findByActividad(
  //   @Param('actividadId') actividadId: string,
  //   @GetUserRole() role: UserRole,
  //   @GetUserId() userId: number,
  // ) {
  //   const resultados =
  //     await this.resultadoActividadService.findByActividad(+actividadId);

  //   if (role !== UserRole.DOCENTE) {
  //     // Filtrar solo los resultados del usuario actual
  //     return resultados.filter((r) => r.usuarioId === userId);
  //   }
  //   return resultados;
  // }

  @Patch(':id')
  @UseGuards(DocenteGuard)
  update(
    @Param('id') id: string,
    @Body() updateResultadoDto: UpdateResultadoActividadDto,
  ) {
    return this.resultadoActividadService.update(+id, updateResultadoDto);
  }

  @Delete(':id')
  @UseGuards(DocenteGuard)
  remove(@Param('id') id: string) {
    return this.resultadoActividadService.remove(+id);
  }
}
