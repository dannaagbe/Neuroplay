import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoActividadDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}