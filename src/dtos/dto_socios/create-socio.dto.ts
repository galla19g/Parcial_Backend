
import { IsString, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';


export class CreateSocioDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsDateString()
  @IsNotEmpty()
  readonly fechaNacimiento: Date;


}
