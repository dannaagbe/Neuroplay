import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('ESTADISTICA_USUARIO')
export class EstadisticaUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column({ type: 'int', default: 0 })
  sesionesCompletadas: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  promedioPuntuacion: number;

  @Column({ type: 'int', default: 0 })
  mejoraPorHabilidad: number;

  @OneToOne(() => User, (user) => user.estadistica)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;
}
