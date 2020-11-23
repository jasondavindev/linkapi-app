import { Deal } from '../deal/schemas/deal.schema';
import { DealAggregatedByCreatedAtDto } from '../deal/dto/deal.aggregation.dto';
import { wonDeal } from './deals';

export const sales: DealAggregatedByCreatedAtDto[] = [
  {
    count: 1,
    date: new Date('2020-11-21'),
    sales: [wonDeal as Deal],
  },
];
