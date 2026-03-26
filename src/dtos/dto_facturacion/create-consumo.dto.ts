import { IsInt, IsPositive, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateConsumoDto {
  @IsInt()
  @IsPositive()
  socioId: number;

  @IsInt()
  @IsPositive()
  servicioId: number;

  @IsOptional()
  @IsDateString()
  fechaConsumo?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}