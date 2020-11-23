import { ApiProperty } from '@nestjs/swagger';
import { Deal } from '../schemas/deal.schema';
import { DealDto } from './deal.dto';

export class DealAggregatedByCreatedAtDto {
  @ApiProperty({
    description: 'Amount of sales in the group',
  })
  count: number;
  @ApiProperty({
    description: 'Sales in the group',
    type: [DealDto],
  })
  sales: Deal[];
  @ApiProperty({ description: 'Sale creation date' })
  date: Date;
}
