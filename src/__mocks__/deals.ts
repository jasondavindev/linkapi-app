import { DealResponseDto } from 'src/pipedrive/dto/deal.response.dto';
import { DealDto } from '../pipedrive/dto/deal.dto';
import { RawDealDto } from '../pipedrive/dto/raw.deal.dto';

export const wonDeal: DealDto = {
  pipeDriveId: 1,
  status: 'won',
  title: 'Product',
  value: 100,
  wonTime: new Date('2020-11-21 00:00:00'),
};

export const rawWonDeal: RawDealDto = {
  status: 'won',
  title: 'Product',
  value: 100,
  won_time: '2020-11-21 00:00:00',
  id: 1,
};

export const dealResponse: DealResponseDto = {
  success: true,
  data: [rawWonDeal],
};
