import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateSesionEntrenamientoDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  usuarioId: number;

  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string; // Usar string para Date

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsNumber()
  @IsOptional()
  puntuacionTotal?: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  actividadId: number;
}