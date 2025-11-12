import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pregunta } from '../pregunta/pregunta.entity';
import { ResultadoActividad } from '../resultado-actividad/resultado-actividad.entity';

@Entity('ACTIVIDAD')
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column('text')
  descripcion: string;

  @Column()
  nivelDificultad: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.actividad)
  preguntas: Pregunta[];

  @OneToMany(() => ResultadoActividad, (resultado) => resultado.actividad)
  resultados: ResultadoActividad[];
}
