import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByCorreo(correo: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ correo });
  }

  async create(user: Partial<User>): Promise<User> {
    if (!user.password) throw new BadRequestException('Password requerido');
    user.password = await bcrypt.hash(user.password, 10);
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

  async update(id: number, updateData: Partial<User>): Promise<User> {
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
