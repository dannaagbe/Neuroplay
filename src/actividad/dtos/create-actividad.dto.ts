import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateActividadDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  tipoId: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  nivelDificultadId: number;
}