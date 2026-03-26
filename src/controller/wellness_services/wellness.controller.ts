import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { WellnessServicesService } from '../../service/wellnes/wellness.service';
import { CreateWellnessServiceDto } from '../../dtos/dto_wellness_services/create-wellness-service.dto';
import { UpdateWellnessServiceDto } from '../../dtos/dto_wellness_services/update-wellness-service.dto';

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

  @Patch(':id')
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
