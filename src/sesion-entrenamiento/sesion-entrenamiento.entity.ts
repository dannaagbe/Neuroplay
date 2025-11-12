import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ResultadoActividad } from '../resultado-actividad/resultado-actividad.entity';

@Entity('SESION_ENTRENAMIENTO')
export class SesionEntrenamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  fechaInicio: Date;

  @Column({ nullable: true })
  fechaFin: Date;

  @Column({ type: 'int', default: 0 })
  puntuacionTotal: number;

  @ManyToOne(() => User, (user) => user.sesiones)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @OneToMany(
    () => ResultadoActividad,
    (resultado) => resultado.sesionEntrenamiento,
  )
  resultados: ResultadoActividad[];
}
