import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  /** POST /planes */
  @Post()
  create(@Body() dto: CreatePlanDto) {
    return this.planesService.create(dto);
  }

  /** GET /planes */
  @Get()
  findAll() {
    return this.planesService.findAll();
  }

  /** GET /planes/:id */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.planesService.findOne(id);
  }

  /** PUT /planes/:id */
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlanDto) {
    return this.planesService.update(id, dto);
  }

  /** DELETE /planes/:id */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.planesService.remove(id);
  }
}