import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateEstadisticaUsuarioDto {
    @IsNumber({}, {
        message: 'El usuarioID debe ser un numero'
    })
    @IsPositive({
        message: 'El usuarioID no puede ser negativo'
    })
    @IsNotEmpty()
    usuarioId: number

    @IsNumber({}, {
        message: 'La propiedad sesionesCompletadas debe ser un numero'
    })
    @IsPositive({
        message: 'La propiedad sesionesCompletadas no puede ser negativo'
    })
    @IsInt({message: 'La propiedad sesionesCompletadas debe ser un entero'})
    @IsNotEmpty()
    sesionesCompletadas: number

    @IsNumber({}, {
        message: 'La propiedad promedioPuntuacion debe ser un numero'
    })
    @IsPositive({
        message: 'La propiedad promedioPuntuacion no puede ser negativo'
    })
    @IsNotEmpty()
    promedioPuntuacion: number;

    @IsNumber({}, {
        message: 'La propiedad mejoraPorHabilidad debe ser un numero'
    })
    @IsPositive({
        message: 'La propiedad mejoraPorHabilidad no puede ser negativo'
    })
    @IsInt({message: 'La propiedad mejoraPorHabilidad debe ser un entero'})
    @IsNotEmpty()
    mejoraPorHabilidad: number;
}