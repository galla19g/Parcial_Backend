import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsPositive()
  costoMensual: number;
}
