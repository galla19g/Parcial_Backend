import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateClaseGrupalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  horario: string;

  @IsNumber()
  @Min(1)
  cupoMaximo: number;

  @IsNumber()
  trainerId: number;
}
