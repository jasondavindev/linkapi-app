import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'Pipedrive product id',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Pipedrive product price',
    example: 2.5,
  })
  price: number;
  @ApiProperty({
    description: 'Product quantity',
    example: 10,
  })
  quantity: number;
  @ApiProperty({
    description: 'Product name',
    example: 'Pencil',
  })
  name: string;
}
