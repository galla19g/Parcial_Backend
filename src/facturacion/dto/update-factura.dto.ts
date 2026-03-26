import { PartialType } from '@nestjs/mapped-types';
import { GenerarFacturaDto } from './generar-factura.dto';

export class UpdateFacturaDto extends PartialType(GenerarFacturaDto) {}
