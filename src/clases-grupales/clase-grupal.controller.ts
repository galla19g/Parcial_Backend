import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ClaseGrupalService } from './clase-grupal.service';
import { CreateClaseGrupalDto } from './dto/create-clase-grupal.dto';

@Controller('clases-grupales')
export class ClaseGrupalController {
  constructor(private readonly claseGrupalService: ClaseGrupalService) {}

  @Post()
  create(@Body() createClaseGrupalDto: CreateClaseGrupalDto) {
    return this.claseGrupalService.create(createClaseGrupalDto);
  }

  @Get()
  findAll() {
    return this.claseGrupalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claseGrupalService.findOne(+id);
  }

  @Patch(':id/registrar')
  registrarSocio(@Param('id') id: string) {
    return this.claseGrupalService.registrarSocio(+id);
  }
}
