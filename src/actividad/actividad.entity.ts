import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pregunta } from '../pregunta/pregunta.entity';
import { ResultadoActividad } from '../resultado-actividad/resultado-actividad.entity';
import { TipoActividad } from './tipo-actividad.entity';
import { SesionEntrenamiento } from 'src/sesion-entrenamiento/sesion-entrenamiento.entity';
import { NivelDificultad } from '../nivel-dificultad/entities/nivel-dificultad.entity';

@Entity('ACTIVIDAD')
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipoId: number;

  @ManyToOne(() => TipoActividad, (tipo) => tipo.actividades)
  @JoinColumn({ name: 'tipoId' })
  tipo: TipoActividad;

  @Column('text')
  descripcion: string;

  @Column()
  nivelDificultadId: number;

  @ManyToOne(() => NivelDificultad, (nivel) => nivel.actividades)
  @JoinColumn({ name: 'nivelDificultadId' })
  nivelDificultad: NivelDificultad;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.actividad)
  preguntas: Pregunta[];

  @OneToMany(() => SesionEntrenamiento, (sesion) => sesion.actividad)
  sesiones: SesionEntrenamiento[];
}
