import { PartialType } from "@nestjs/swagger";
import { CreateEstadisticaUsuarioDto } from "./create-estadistica-usuario.dto";

export class UpdateEstadisticasUsuarioDTO extends PartialType(CreateEstadisticaUsuarioDto) {}