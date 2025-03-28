/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 255)
  name: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsString()
  @IsOptional()
  @Length(5, 50)
  profile: string; // Puede ser 'vendor', 'provider', 'admin'

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
