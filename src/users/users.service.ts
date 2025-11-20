import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { NivelDificultad } from '../nivel-dificultad/entities/nivel-dificultad.entity';
import { UserRole } from './user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(NivelDificultad)
    private nivelDificultadRepository: Repository<NivelDificultad>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['nivelInicial'],
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['nivelInicial'],
    });
  }

  findByCorreo(correo: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ correo });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto)
    
    const user = { ...createUserDto };
    console.log(user)
    if (!user.password) throw new BadRequestException('Password requerido');
    user.password = await bcrypt.hash(user.password, 10);

    // Asignar nivel principiante automáticamente si es estudiante y no tiene nivel
    if ((!user.rol || user.rol === UserRole.ESTUDIANTE) && !user.nivelInicialId) {
      const nivelPrincipiante = await this.nivelDificultadRepository.findOne({
        where: { codigo: 'PRINCIPIANTE' },
      });
      if (nivelPrincipiante) {
        user.nivelInicialId = nivelPrincipiante.id;
      }
    }

    const newUser = this.usersRepository.create(user);
    try {
      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError?.code === 'ER_DUP_ENTRY' ||
          error.message.includes('UNIQUE constraint failed: user.correo'))
      ) {
        throw new BadRequestException('El correo ya está registrado');
      }
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateData = { ...updateUserDto };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    await this.usersRepository.update(id, updateData);
    const updated = await this.findOne(id);
    if (!updated) throw new BadRequestException('Usuario no encontrado');
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
