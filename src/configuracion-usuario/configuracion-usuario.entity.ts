import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('CONFIGURACION_USUARIO')
export class ConfiguracionUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  tema: string;

  @Column()
  idioma: string;

  @Column()
  velocidadPreferida: string;

  @Column()
  nivelBase: string;

  @OneToOne(() => User, (user) => user.configuracion)
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;
}
