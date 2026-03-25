import { IsInt, IsPositive, Min, Max } from 'class-validator';

export class GenerarFacturaDto {
  @IsInt()
  @IsPositive()
  socioId: number;

  @IsInt()
  @Min(1)
  @Max(12)
  periodoMes: number;

  @IsInt()
  @IsPositive()
  periodoAnio: number;
}