import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoActividad } from '../tipo-actividad.entity';
import { CreateTipoActividadDto } from './dtos/create-tipo-actividad.dto';
import { UpdateTipoActividadDto } from './dtos/update-tipo-actividad.dto';

@Injectable()
export class TipoActividadService implements OnModuleInit {
  constructor(
    @InjectRepository(TipoActividad)
    private tipoActividadRepository: Repository<TipoActividad>,
  ) {}

  async onModuleInit() {
    await this.seedTiposActividad();
  }

  private async seedTiposActividad() {
    const tipos = [
      { codigo: 'ATENCION', nombre: 'Atención', descripcion: 'Actividades para mejorar la capacidad de concentración y atención sostenida' },
      { codigo: 'MEMORIA', nombre: 'Memoria', descripcion: 'Ejercicios para fortalecer la memoria a corto y largo plazo' },
      { codigo: 'RESOLUCION_PROBLEMAS', nombre: 'Resolución de Problemas', descripcion: 'Actividades que estimulan el pensamiento lógico y la resolución de problemas' },
      { codigo: 'VELOCIDAD_PROCESAMIENTO', nombre: 'Velocidad de Procesamiento', descripcion: 'Ejercicios para mejorar la rapidez de procesamiento de información' },
      { codigo: 'FLEXIBILIDAD_COGNITIVA', nombre: 'Flexibilidad Cognitiva', descripcion: 'Actividades que mejoran la capacidad de adaptación y cambio de perspectiva' },
    ];

    for (const tipoData of tipos) {
      const existe = await this.tipoActividadRepository.findOne({
        where: { codigo: tipoData.codigo },
      });

      if (!existe) {
        const tipo = this.tipoActividadRepository.create(tipoData);
        await this.tipoActividadRepository.save(tipo);
      }
    }
  }

  async create(createTipoActividadDto: CreateTipoActividadDto): Promise<TipoActividad> {
    const nuevoTipo = this.tipoActividadRepository.create(createTipoActividadDto);
    return await this.tipoActividadRepository.save(nuevoTipo);
  }

  async findAll(): Promise<TipoActividad[]> {
    return await this.tipoActividadRepository.find({
      relations: ['actividades'],
    });
  }

  async findOne(id: number): Promise<TipoActividad> {
    const tipo = await this.tipoActividadRepository.findOne({
      where: { id },
      relations: ['actividades'],
    });
    if (!tipo) {
      throw new NotFoundException(`Tipo de actividad con ID ${id} no encontrado`);
    }
    return tipo;
  }

  async update(id: number, updateTipoActividadDto: UpdateTipoActividadDto): Promise<TipoActividad> {
    await this.tipoActividadRepository.update(id, updateTipoActividadDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tipoActividadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo de actividad con ID ${id} no encontrado`);
    }
  }
}