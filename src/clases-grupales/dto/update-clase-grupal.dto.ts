import { PartialType } from '@nestjs/mapped-types';
import { CreateClaseGrupalDto } from './create-clase-grupal.dto';

export class UpdateClaseGrupalDto extends PartialType(CreateClaseGrupalDto) {}
