import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePreguntaDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  actividadId: number;

  @IsString()
  @IsNotEmpty()
  enunciado: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  opciones: string[];

  @IsString()
  @IsNotEmpty()
  respuestaCorrecta: string;
}