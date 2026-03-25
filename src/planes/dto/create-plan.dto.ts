import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, MaxLength } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsNumber()
  @IsPositive()
  costoMensual: number;

  @IsOptional()
  @IsString()
  descripcion?: string;
}