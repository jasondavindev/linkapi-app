import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class DealDto {
  @ApiProperty({
    description: 'Id of pipedrive deal',
    example: 1,
  })
  pipeDriveId: number;
  @ApiProperty({
    description: 'Name deal',
    example: 'My deal',
  })
  title: string;
  @ApiProperty({
    description: 'Deal pipeline status',
    default: 'won',
  })
  status: string;
  @ApiProperty({
    description: 'Deal value (sum of products price)',
    example: 10.5,
  })
  value: number;
  @ApiProperty({
    description: 'The date of sales gain',
  })
  wonTime: Date;
  @ApiProperty({
    description: 'Customer name',
    example: 'Juca',
  })
  personName: string;
  @ApiProperty({
    description: 'Sale products',
    type: [ProductDto],
  })
  products?: ProductDto[];
  sentToPipedrive?: boolean;
}
