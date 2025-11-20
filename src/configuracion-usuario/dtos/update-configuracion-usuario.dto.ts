import { PartialType } from '@nestjs/swagger';
import { CreateConfiguracionUsuarioDto } from './create-configuracion-usuario.dto';

export class UpdateConfiguracionUsuarioDto extends PartialType(CreateConfiguracionUsuarioDto) {}