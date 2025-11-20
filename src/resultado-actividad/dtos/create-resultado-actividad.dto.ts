import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateResultadoActividadDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  usuarioId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  sesionEntrenamientoId: number;

  @IsNumber()
  @IsOptional()
  aciertos?: number;

  @IsNumber()
  @IsOptional()
  errores?: number;

  @IsNumber()
  @IsOptional()
  tiempoTotal?: number;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;
}