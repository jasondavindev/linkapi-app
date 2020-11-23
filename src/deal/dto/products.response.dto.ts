import { RawProductDto } from './raw.product.dto';

export interface ProductsResponseDto {
  success: boolean;
  data: RawProductDto[];
}
