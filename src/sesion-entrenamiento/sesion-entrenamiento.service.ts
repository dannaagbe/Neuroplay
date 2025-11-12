import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SesionEntrenamiento } from './sesion-entrenamiento.entity';

@Injectable()
export class SesionEntrenamientoService {
  constructor(
    @InjectRepository(SesionEntrenamiento)
    private sesionRepository: Repository<SesionEntrenamiento>,
  ) {}

  async create(
    sesion: Partial<SesionEntrenamiento>,
  ): Promise<SesionEntrenamiento> {
    const nuevaSesion = this.sesionRepository.create({
      ...sesion,
      fechaInicio: new Date(),
    });
    return await this.sesionRepository.save(nuevaSesion);
  }

  async findAll(): Promise<SesionEntrenamiento[]> {
    return await this.sesionRepository.find({
      relations: ['usuario', 'resultados'],
    });
  }

  async findOne(id: number): Promise<SesionEntrenamiento> {
    const sesion = await this.sesionRepository.findOne({
      where: { id },
      relations: ['usuario', 'resultados'],
    });
    if (!sesion) {
      throw new NotFoundException(`Sesión con ID ${id} no encontrada`);
    }
    return sesion;
  }

  async findByUsuario(usuarioId: number): Promise<SesionEntrenamiento[]> {
    return await this.sesionRepository.find({
      where: { usuarioId },
      relations: ['resultados'],
      order: { fechaInicio: 'DESC' },
    });
  }

  async finalizarSesion(id: number): Promise<SesionEntrenamiento> {
    const sesion = await this.findOne(id);
    sesion.fechaFin = new Date();
    return await this.sesionRepository.save(sesion);
  }

  async update(
    id: number,
    updateData: Partial<SesionEntrenamiento>,
  ): Promise<SesionEntrenamiento> {
    await this.sesionRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sesionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sesión con ID ${id} no encontrada`);
    }
  }
}
