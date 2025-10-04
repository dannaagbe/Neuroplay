import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  correo: string;

  @Column('simple-array')
  roles: string[];

  @Column()
  nombre: string;

  @Column()
  idiomaPreferido: string;

  @Column()
  NivelInicial: string;

  @Column()
  password: string;
}
