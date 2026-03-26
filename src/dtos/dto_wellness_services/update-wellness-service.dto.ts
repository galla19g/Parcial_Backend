import { PartialType } from '@nestjs/mapped-types';
import { CreateWellnessServiceDto } from './create-wellness-service.dto';

export class UpdateWellnessServiceDto extends PartialType(
  CreateWellnessServiceDto,
) {}
