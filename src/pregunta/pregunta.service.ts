import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { CreatePreguntaDto } from './dtos/create-pregunta.dto';
import { UpdatePreguntaDto } from './dtos/update-pregunta.dto';

@Injectable()
export class PreguntaService {
  constructor(
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
  ) {}

  async create(createPreguntaDto: CreatePreguntaDto): Promise<Pregunta> {
    const nuevaPregunta = this.preguntaRepository.create(createPreguntaDto);
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

  async update(id: number, updatePreguntaDto: UpdatePreguntaDto): Promise<Pregunta> {
    await this.preguntaRepository.update(id, updatePreguntaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.preguntaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada`);
    }
  }
}
