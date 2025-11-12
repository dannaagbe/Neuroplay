import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from './actividad.entity';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(Actividad)
    private actividadRepository: Repository<Actividad>,
  ) {}

  async create(actividad: Partial<Actividad>): Promise<Actividad> {
    const nuevaActividad = this.actividadRepository.create(actividad);
    return await this.actividadRepository.save(nuevaActividad);
  }

  async findAll(): Promise<Actividad[]> {
    return await this.actividadRepository.find({
      relations: ['preguntas', 'resultados'],
    });
  }

  async findOne(id: number): Promise<Actividad> {
    const actividad = await this.actividadRepository.findOne({
      where: { id },
      relations: ['preguntas', 'resultados'],
    });
    if (!actividad) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }
    return actividad;
  }

  async findByNivel(nivelDificultad: string): Promise<Actividad[]> {
    return await this.actividadRepository.find({
      where: { nivelDificultad },
      relations: ['preguntas'],
    });
  }

  async findByTipo(tipo: string): Promise<Actividad[]> {
    return await this.actividadRepository.find({
      where: { tipo },
      relations: ['preguntas'],
    });
  }

  async update(id: number, updateData: Partial<Actividad>): Promise<Actividad> {
    await this.actividadRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.actividadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }
  }
}
