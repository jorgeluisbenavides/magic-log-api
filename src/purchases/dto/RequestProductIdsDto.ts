import { Type } from "class-transformer";
import { IsArray, IsInt, Min, ValidateNested } from "class-validator";

export class RequestProductIdsDto {
  @IsArray({ message: 'product_ids Array requerido' })
  @ValidateNested({ each: true })
  @Type(() => RequestproductCartDto)
  product_ids: RequestproductCartDto[];
}

export class RequestproductCartDto {
  @IsInt({ message: 'El id del producto debe ser un número entero' })
  @Min(1, { message: 'El id del producto debe ser mayor a 0' })
  id: number;

  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  quantity: number;
}