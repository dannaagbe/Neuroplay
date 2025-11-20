import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadisticaUsuario } from './estadistica-usuario.entity';
import { CreateEstadisticaUsuarioDto } from './dtos/create-estadistica-usuario.dto';
import { UpdateEstadisticasUsuarioDTO } from './dtos/update-estadisticas-usuario.dto';

@Injectable()
export class EstadisticaUsuarioService {
  constructor(
    @InjectRepository(EstadisticaUsuario)
    private estadisticaRepository: Repository<EstadisticaUsuario>,
  ) {}

  async create(
    estadistica: CreateEstadisticaUsuarioDto,
  ): Promise<EstadisticaUsuario> {
    const nuevaEstadistica = this.estadisticaRepository.create(estadistica);
    return await this.estadisticaRepository.save(nuevaEstadistica);
  }

  async findAll(): Promise<EstadisticaUsuario[]> {
    return await this.estadisticaRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number): Promise<EstadisticaUsuario> {
    const estadistica = await this.estadisticaRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!estadistica) {
      throw new NotFoundException(`Estadística con ID ${id} no encontrada`);
    }
    return estadistica;
  }

  async findByUserId(usuarioId: number): Promise<EstadisticaUsuario> {
    const estadistica = await this.estadisticaRepository.findOne({
      where: { usuarioId },
      relations: ['usuario'],
    });
    if (!estadistica) {
      throw new NotFoundException(
        `Estadística para usuario ${usuarioId} no encontrada`,
      );
    }
    return estadistica;
  }

  async update(
    id: number,
    updateData: UpdateEstadisticasUsuarioDTO,
  ): Promise<EstadisticaUsuario> {
    await this.estadisticaRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.estadisticaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Estadística con ID ${id} no encontrada`);
    }
  }
}
