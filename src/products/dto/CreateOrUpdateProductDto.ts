import {
  IsString,
  IsBoolean,
  IsOptional,
  Length,
  IsInt,
} from 'class-validator';

export class CreateOrUpdateProductDto {
  @IsString()
  @Length(3, 50, { message: 'El nombre debe tener al menos 3 y 50 caracteres' })
  name: string;

  @IsString()
  @Length(3, 25, {
    message: 'El sku debe tener al menos 3 y 25 caracteres',
  })
  sku: string;

  @IsInt({
    message: `La cantidad deber ser númerica`,
  })
  quantity: number;

  @IsInt({
    message: `El precio deber ser númerico`,
  })
  price: number;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
