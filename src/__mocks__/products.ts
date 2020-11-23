import { ProductDto } from 'src/deal/dto/product.dto';
import { ProductsResponseDto } from 'src/deal/dto/products.response.dto';
import { RawProductDto } from 'src/deal/dto/raw.product.dto';

export const productDto: ProductDto = {
  id: 1,
  price: 10,
  quantity: 2,
  name: 'Product',
};

export const rawProduct: RawProductDto = {
  item_price: 10,
  quantity: 2,
  name: 'Product',
  product_id: 1,
};

export const productResponse: ProductsResponseDto = {
  data: [rawProduct],
  success: true,
};
