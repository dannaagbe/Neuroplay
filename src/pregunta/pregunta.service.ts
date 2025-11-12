import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from './pregunta.entity';

@Injectable()
export class PreguntaService {
  constructor(
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
  ) {}

  async create(pregunta: Partial<Pregunta>): Promise<Pregunta> {
    const nuevaPregunta = this.preguntaRepository.create(pregunta);
    return await this.preguntaRepository.save(nuevaPregunta);
  }

  async findAll(): Promise<Pregunta[]> {
    return await this.preguntaRepository.find({ relations: ['actividad'] });
  }

  async findOne(id: number): Promise<Pregunta> {
    const pregunta = await this.preguntaRepository.findOne({
      where: { id },
      relations: ['actividad'],
    });
    if (!pregunta) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada`);
    }
    return pregunta;
  }

  async findByActividad(actividadId: number): Promise<Pregunta[]> {
    return await this.preguntaRepository.find({
      where: { actividadId },
      relations: ['actividad'],
    });
  }

  async update(id: number, updateData: Partial<Pregunta>): Promise<Pregunta> {
    await this.preguntaRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.preguntaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada`);
    }
  }
}
