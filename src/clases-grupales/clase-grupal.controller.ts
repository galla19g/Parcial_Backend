import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { ClaseGrupalService } from './clase-grupal.service';
import { CreateClaseGrupalDto } from './dto/create-clase-grupal.dto';
import { UpdateClaseGrupalDto } from './dto/update-clase-grupal.dto';

@Controller('clases-grupales')
export class ClaseGrupalController {
  constructor(private readonly claseGrupalService: ClaseGrupalService) { }

  @Post()
  create(@Body() createClaseGrupalDto: CreateClaseGrupalDto) {
    return this.claseGrupalService.create(createClaseGrupalDto);
  }

  @Get()
  findAll() {
    return this.claseGrupalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.claseGrupalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClaseGrupalDto: UpdateClaseGrupalDto) {
    return this.claseGrupalService.update(id, updateClaseGrupalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.claseGrupalService.remove(id);
  }

  @Patch(':id/register')
  registerMember(@Param('id', ParseIntPipe) id: number) {
    return this.claseGrupalService.registrarSocio(id);
  }
}
