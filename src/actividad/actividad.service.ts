import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Actividad } from './actividad.entity';
import { CreateActividadDto } from './dtos/create-actividad.dto';
import { UpdateActividadDto } from './dtos/update-actividad.dto';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(Actividad)
    private actividadRepository: Repository<Actividad>,
  ) {}

  async create(createActividadDto: CreateActividadDto): Promise<Actividad> {
    const nuevaActividad = this.actividadRepository.create(createActividadDto);
    return await this.actividadRepository.save(nuevaActividad);
  }

  async findAll(
    tipoId?: number,
    nivelDificultadId?: number,
  ): Promise<Actividad[]> {
    const where: FindManyOptions<Actividad>['where'] = {};

    if (tipoId !== undefined) {
      where.tipoId = tipoId;
    }

    if (nivelDificultadId !== undefined) {
      where.nivelDificultadId = nivelDificultadId;
    }

    return await this.actividadRepository.find({
      where: { ...where },
      relations: ['preguntas', 'sesiones', 'tipo', 'nivelDificultad'],
    });
  }

  async findOne(id: number): Promise<Actividad> {
    const actividad = await this.actividadRepository.findOne({
      where: { id },
      relations: ['preguntas', 'sesiones', 'tipo', 'nivelDificultad'],
    });
    if (!actividad) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }
    return actividad;
  }

  async update(id: number, updateActividadDto: UpdateActividadDto): Promise<Actividad> {
    await this.actividadRepository.update(id, updateActividadDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.actividadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }
  }
}
