import { PartialType } from '@nestjs/swagger';
import { CreateResultadoActividadDto } from './create-resultado-actividad.dto';

export class UpdateResultadoActividadDto extends PartialType(CreateResultadoActividadDto) {}