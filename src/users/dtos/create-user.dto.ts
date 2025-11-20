import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsOptional()
  @IsEnum(UserRole)
  rol?: UserRole;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  idiomaPreferido: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  nivelInicialId?: number;
}