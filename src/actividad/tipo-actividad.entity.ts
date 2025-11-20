import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Actividad } from './actividad.entity';

@Entity('TIPO_ACTIVIDAD')
export class TipoActividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;

  @Column()
  nombre: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @OneToMany(() => Actividad, (actividad) => actividad.tipo)
  actividades: Actividad[];
}