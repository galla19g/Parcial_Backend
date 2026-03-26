import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SocioService } from '../../service/socios/socio.service';
import { CreateSocioDto } from '../../dtos/dto_socios/create-socio.dto';
import { UpdateSocioDto } from '../../dtos/dto_socios/update-socio.dto';

@Controller('socios')
export class SocioController {
  constructor(private readonly socioService: SocioService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createSocioDto: CreateSocioDto) {
    return this.socioService.create(createSocioDto);
  }

  @Get()
  findAll() {
    return this.socioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.socioService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSocioDto: UpdateSocioDto,
  ) {
    return this.socioService.update(id, updateSocioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.socioService.remove(id);
  }
}
