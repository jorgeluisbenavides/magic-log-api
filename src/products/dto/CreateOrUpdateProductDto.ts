import {
  IsString,
  IsBoolean,
  IsOptional,
  Length,
  IsInt,
  IsDecimal,
} from 'class-validator';

export class CreateOrUpdateProductDto {
  @IsString()
  @Length(3, 50, { message: 'El nombre debe tener al menos 3 y 50 caracteres' })
  name: string;

  @IsString()
  @Length(6, 25, {
    message: 'La contraseña debe tener al menos 6 y 25 caracteres',
  })
  sku: string;

  @IsInt({
    message: `La cantidad deber ser númerica`,
  })
  quantity: number;

  @IsDecimal()
  price: number;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
