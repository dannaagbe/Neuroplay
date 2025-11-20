import { PartialType } from '@nestjs/swagger';
import { CreateSesionEntrenamientoDto } from './create-sesion-entrenamiento.dto';

export class UpdateSesionEntrenamientoDto extends PartialType(CreateSesionEntrenamientoDto) {}