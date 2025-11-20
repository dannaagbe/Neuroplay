import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Actividad } from '../../actividad/actividad.entity';

@Entity('NIVEL_DIFICULTAD')
export class NivelDificultad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;

  @Column({ unique: true })
  nombre: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column({ type: 'int', default: 0 })
  orden: number;

  @OneToMany(() => Actividad, (actividad) => actividad.nivelDificultad)
  actividades: Actividad[];
}
