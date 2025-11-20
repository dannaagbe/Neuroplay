import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNivelDificultadDto } from './dto/create-nivel-dificultad.dto';
import { UpdateNivelDificultadDto } from './dto/update-nivel-dificultad.dto';
import { NivelDificultad } from './entities/nivel-dificultad.entity';

@Injectable()
export class NivelDificultadService implements OnModuleInit {
  constructor(
    @InjectRepository(NivelDificultad)
    private nivelDificultadRepository: Repository<NivelDificultad>,
  ) {}

  async onModuleInit() {
    await this.seedNivelesDificultad();
  }

  private async seedNivelesDificultad() {
    const niveles = [
      { codigo: 'PRINCIPIANTE', nombre: 'Principiante', descripcion: 'Nivel básico para usuarios que están comenzando', orden: 1 },
      { codigo: 'BASICO', nombre: 'Básico', descripcion: 'Nivel para usuarios con conocimientos iniciales', orden: 2 },
      { codigo: 'INTERMEDIO', nombre: 'Intermedio', descripcion: 'Nivel para usuarios con experiencia moderada', orden: 3 },
      { codigo: 'AVANZADO', nombre: 'Avanzado', descripcion: 'Nivel para usuarios con amplia experiencia', orden: 4 },
      { codigo: 'EXPERTO', nombre: 'Experto', descripcion: 'Nivel para usuarios con dominio completo', orden: 5 },
    ];

    for (const nivelData of niveles) {
      const existe = await this.nivelDificultadRepository.findOne({
        where: { codigo: nivelData.codigo },
      });

      if (!existe) {
        const nivel = this.nivelDificultadRepository.create(nivelData);
        await this.nivelDificultadRepository.save(nivel);
      }
    }
  }

  async create(createNivelDificultadDto: CreateNivelDificultadDto): Promise<NivelDificultad> {
    const nuevoNivel = this.nivelDificultadRepository.create(createNivelDificultadDto);
    return await this.nivelDificultadRepository.save(nuevoNivel);
  }

  async findAll(): Promise<NivelDificultad[]> {
    return await this.nivelDificultadRepository.find({
      order: { orden: 'ASC' },
    });
  }

  async findOne(id: number): Promise<NivelDificultad> {
    const nivel = await this.nivelDificultadRepository.findOne({
      where: { id },
      relations: ['actividades'],
    });
    if (!nivel) {
      throw new NotFoundException(`Nivel de dificultad con ID ${id} no encontrado`);
    }
    return nivel;
  }

  async update(id: number, updateNivelDificultadDto: UpdateNivelDificultadDto): Promise<NivelDificultad> {
    await this.nivelDificultadRepository.update(id, updateNivelDificultadDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.nivelDificultadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Nivel de dificultad con ID ${id} no encontrado`);
    }
  }
}
