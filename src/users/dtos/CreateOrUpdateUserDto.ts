/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  Length,
  IsEnum,
} from 'class-validator';
import { UserProfile } from 'src/enums/enum';

export class CreateOrUpdateUserDto {
  @IsString()
  @Length(3, 50, { message: 'El nombre debe tener al menos 3 y 50 caracteres' })
  name: string;

  @IsEmail({}, { message: 'El correo deber ser válido' })
  email: string;

  @IsString()
  @Length(6, 25, {
    message: 'La contraseña debe tener al menos 6 y 25 caracteres',
  })
  password: string;

  @IsEnum(UserProfile, {
    message: `El perfil debe ser uno de los siguientes roles: ${Object.values(UserProfile).join(', ')}`,
  })
  profile: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
