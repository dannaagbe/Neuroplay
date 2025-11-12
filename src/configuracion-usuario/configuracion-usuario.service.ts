import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguracionUsuario } from './configuracion-usuario.entity';

@Injectable()
export class ConfiguracionUsuarioService {
  constructor(
    @InjectRepository(ConfiguracionUsuario)
    private configuracionRepository: Repository<ConfiguracionUsuario>,
  ) {}

  async create(
    configuracion: Partial<ConfiguracionUsuario>,
  ): Promise<ConfiguracionUsuario> {
    const nuevaConfiguracion =
      this.configuracionRepository.create(configuracion);
    return await this.configuracionRepository.save(nuevaConfiguracion);
  }

  async findAll(): Promise<ConfiguracionUsuario[]> {
    return await this.configuracionRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number): Promise<ConfiguracionUsuario> {
    const configuracion = await this.configuracionRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!configuracion) {
      throw new NotFoundException(`Configuración con ID ${id} no encontrada`);
    }
    return configuracion;
  }

  async findByUserId(usuarioId: number): Promise<ConfiguracionUsuario> {
    const configuracion = await this.configuracionRepository.findOne({
      where: { usuarioId },
      relations: ['usuario'],
    });
    if (!configuracion) {
      throw new NotFoundException(
        `Configuración para usuario ${usuarioId} no encontrada`,
      );
    }
    return configuracion;
  }

  async update(
    id: number,
    updateData: Partial<ConfiguracionUsuario>,
  ): Promise<ConfiguracionUsuario> {
    await this.configuracionRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.configuracionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Configuración con ID ${id} no encontrada`);
    }
  }
}
