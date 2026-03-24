import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { WellnessServicesService } from './wellness.service';
import { CreateWellnessServiceDto } from './dto/create-wellness-service.dto';
import { UpdateWellnessServiceDto } from './dto/update-wellness-service.dto';

@Controller('wellness-services')
export class WellnessController {
  constructor(private readonly wellnessService: WellnessServicesService) {}

  @Post()
  create(@Body() dto: CreateWellnessServiceDto) {
    return this.wellnessService.create(dto);
  }

  @Get()
  findAll() {
    return this.wellnessService.findAll();
  }

  @Get('active')
  findAllActive() {
    return this.wellnessService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wellnessService.findOne(id);
  }

  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWellnessServiceDto,
  ) {
    return this.wellnessService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wellnessService.remove(id);
  }
}
