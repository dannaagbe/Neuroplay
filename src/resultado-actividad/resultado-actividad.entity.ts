import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Actividad } from '../actividad/actividad.entity';
import { SesionEntrenamiento } from '../sesion-entrenamiento/sesion-entrenamiento.entity';

@Entity('RESULTADO_ACTIVIDAD')
export class ResultadoActividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  actividadId: number;

  @Column()
  sesionEntrenamientoId: number;

  @Column({ type: 'int', default: 0 })
  aciertos: number;

  @Column({ type: 'int', default: 0 })
  errores: number;

  @Column({ type: 'int', default: 0 })
  tiempoTotal: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => User, (user) => user.resultados)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @ManyToOne(() => Actividad, (actividad) => actividad.resultados)
  @JoinColumn({ name: 'actividadId' })
  actividad: Actividad;

  @ManyToOne(() => SesionEntrenamiento, (sesion) => sesion.resultados)
  @JoinColumn({ name: 'sesionEntrenamientoId' })
  sesionEntrenamiento: SesionEntrenamiento;
}
