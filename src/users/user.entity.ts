import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ConfiguracionUsuario } from '../configuracion-usuario/configuracion-usuario.entity';
import { EstadisticaUsuario } from '../estadistica-usuario/estadistica-usuario.entity';
import { SesionEntrenamiento } from '../sesion-entrenamiento/sesion-entrenamiento.entity';
import { ResultadoActividad } from '../resultado-actividad/resultado-actividad.entity';
import { UserRole } from './user-role.enum';
import { NivelDificultad } from '../nivel-dificultad/entities/nivel-dificultad.entity';

@Entity('USUARIO')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ESTUDIANTE,
  })
  rol: UserRole;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  password: string;

  @Column()
  idiomaPreferido: string;

  @Column({ nullable: true })
  nivelInicialId: number;

  @ManyToOne(() => NivelDificultad, { nullable: true })
  @JoinColumn({ name: 'nivelInicialId' })
  nivelInicial: NivelDificultad;

  @OneToOne(() => ConfiguracionUsuario, (config) => config.usuario)
  configuracion: ConfiguracionUsuario;

  @OneToOne(() => EstadisticaUsuario, (estadistica) => estadistica.usuario)
  estadistica: EstadisticaUsuario;

  @OneToMany(() => SesionEntrenamiento, (sesion) => sesion.usuario)
  sesiones: SesionEntrenamiento[];

  @OneToMany(() => ResultadoActividad, (resultado) => resultado.usuario)
  resultados: ResultadoActividad[];
}
