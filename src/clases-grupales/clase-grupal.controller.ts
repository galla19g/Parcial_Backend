import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch } from '@nestjs/common';
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

  @Patch(':id/register')
  registerMember(@Param('id', ParseIntPipe) id: number) {
    return this.claseGrupalService.registrarSocio(id);
  }
}
