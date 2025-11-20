import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNivelDificultadDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsInt()
  @IsOptional()
  orden?: number;
}
