import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socio } from './entities/socio.entity';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(Socio)
    private readonly socioRepository: Repository<Socio>,
  ) {}

  /**
   
    @param createSocioDto 
    @returns 
   */
  async create(createSocioDto: CreateSocioDto): Promise<Socio> {
    const nuevoSocio = this.socioRepository.create(createSocioDto);
    return await this.socioRepository.save(nuevoSocio);
  }

  /**
   
   @returns 
   */
  async findAll(): Promise<Socio[]> {
    return await this.socioRepository.find({});
  }

  /**
   
    @param id 
    @returns 
    @throws 
   */
  async findOne(id: number): Promise<Socio> {
    const socio = await this.socioRepository.findOne({
      where: { id },
    });
    if (!socio) {
      throw new NotFoundException(`Socio con ID "${id}" no encontrado.`);
    }
    return socio;
  }

  /**
   
   @param id
   @param updateSocioDto
   @returns 
   */
  async update(id: number, updateSocioDto: UpdateSocioDto): Promise<Socio> {
    const socio = await this.socioRepository.preload({
      id: id,
      ...updateSocioDto,
    });
    if (!socio) {
      throw new NotFoundException(
        `Socio con ID "${id}" no encontrado para actualizar.`,
      );
    }
    return await this.socioRepository.save(socio);
  }

  /**
   
    @param id 
   */
  async remove(id: number): Promise<void> {
    const result = await this.socioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Socio con ID "${id}" no encontrado para eliminar.`,
      );
    }
  }
}
