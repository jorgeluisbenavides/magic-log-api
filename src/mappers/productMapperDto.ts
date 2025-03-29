import { ResponseProductDto } from "src/products/dto/ResponseProductDto";
import { Product } from "src/products/entities/product.entity";

export class ProductMapper {
  static toResponseDto(product: Product): ResponseProductDto {
    return {
      id: product.id,
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      price: product.price,
      active: product.active,
    };
  }

  static toResponseDtoList(products: Product[]): ResponseProductDto[] {
    return products.map(product => this.toResponseDto(product));
  }
}