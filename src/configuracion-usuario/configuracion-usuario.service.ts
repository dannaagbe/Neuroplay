import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguracionUsuario } from './configuracion-usuario.entity';
import { CreateConfiguracionUsuarioDto } from './dtos/create-configuracion-usuario.dto';
import { UpdateConfiguracionUsuarioDto } from './dtos/update-configuracion-usuario.dto';

@Injectable()
export class ConfiguracionUsuarioService {
  constructor(
    @InjectRepository(ConfiguracionUsuario)
    private configuracionRepository: Repository<ConfiguracionUsuario>,
  ) {}

  async create(
    createConfiguracionDto: CreateConfiguracionUsuarioDto,
  ): Promise<ConfiguracionUsuario> {
    const nuevaConfiguracion =
      this.configuracionRepository.create(createConfiguracionDto);
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
    updateConfiguracionDto: UpdateConfiguracionUsuarioDto,
  ): Promise<ConfiguracionUsuario> {
    await this.configuracionRepository.update(id, updateConfiguracionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.configuracionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Configuración con ID ${id} no encontrada`);
    }
  }
}
