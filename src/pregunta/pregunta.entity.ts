import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Actividad } from '../actividad/actividad.entity';

@Entity('PREGUNTA')
export class Pregunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actividadId: number;

  @Column('text')
  enunciado: string;

  @Column()
  tipo: string;

  @Column('simple-json')
  opciones: string[];

  @Column()
  respuestaCorrecta: string;

  @ManyToOne(() => Actividad, (actividad) => actividad.preguntas)
  @JoinColumn({ name: 'actividadId' })
  actividad: Actividad;
}
