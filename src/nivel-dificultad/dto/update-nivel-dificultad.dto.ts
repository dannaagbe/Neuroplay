import { PartialType } from '@nestjs/swagger';
import { CreateNivelDificultadDto } from './create-nivel-dificultad.dto';

export class UpdateNivelDificultadDto extends PartialType(CreateNivelDificultadDto) {}
