import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateConfiguracionUsuarioDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  usuarioId: number;

  @IsString()
  @IsNotEmpty()
  tema: string;

  @IsString()
  @IsNotEmpty()
  idioma: string;

  @IsString()
  @IsNotEmpty()
  velocidadPreferida: string;

  @IsString()
  @IsNotEmpty()
  nivelBase: string;
}