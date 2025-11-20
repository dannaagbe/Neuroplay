import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultadoActividad } from './resultado-actividad.entity';
import { CreateResultadoActividadDto } from './dtos/create-resultado-actividad.dto';
import { UpdateResultadoActividadDto } from './dtos/update-resultado-actividad.dto';

@Injectable()
export class ResultadoActividadService {
  constructor(
    @InjectRepository(ResultadoActividad)
    private resultadoRepository: Repository<ResultadoActividad>,
  ) {}

  async create(
    createResultadoDto: CreateResultadoActividadDto,
  ): Promise<ResultadoActividad> {
    const nuevoResultado = this.resultadoRepository.create({
      ...createResultadoDto,
      fecha: new Date(createResultadoDto.fecha),
    });
    return await this.resultadoRepository.save(nuevoResultado);
  }

  async findAll(): Promise<ResultadoActividad[]> {
    return await this.resultadoRepository.find({
      relations: ['usuario', 'actividad', 'sesionEntrenamiento'],
    });
  }

  async findOne(id: number): Promise<ResultadoActividad> {
    const resultado = await this.resultadoRepository.findOne({
      where: { id },
      relations: ['usuario', 'actividad', 'sesionEntrenamiento'],
    });
    if (!resultado) {
      throw new NotFoundException(`Resultado con ID ${id} no encontrado`);
    }
    return resultado;
  }

  async findByUsuario(usuarioId: number): Promise<ResultadoActividad[]> {
    return await this.resultadoRepository.find({
      where: { usuarioId },
      relations: ['actividad', 'sesionEntrenamiento'],
      order: { fecha: 'DESC' },
    });
  }

  async findBySesion(
    sesionEntrenamientoId: number,
  ): Promise<ResultadoActividad[]> {
    return await this.resultadoRepository.find({
      where: { sesionEntrenamientoId },
      relations: ['actividad', 'usuario'],
    });
  }

  // async findByActividad(actividadId: number): Promise<ResultadoActividad[]> {
  //   return await this.resultadoRepository.find({
  //     where: { actividadId },
  //     relations: ['usuario', 'sesionEntrenamiento'],
  //   });
  // }

  async update(
    id: number,
    updateResultadoDto: UpdateResultadoActividadDto,
  ): Promise<ResultadoActividad> {
    await this.resultadoRepository.update(id, updateResultadoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.resultadoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Resultado con ID ${id} no encontrado`);
    }
  }
}
