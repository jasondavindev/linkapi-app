import { DealResponseDto } from '../deal/dto/deal.response.dto';
import { DealDto } from '../deal/dto/deal.dto';
import { RawDealDto } from '../deal/dto/raw.deal.dto';

export const wonDeal: DealDto = {
  pipeDriveId: 1,
  status: 'won',
  title: 'Product',
  value: 100,
  wonTime: new Date('2020-11-21 00:00:00'),
  personName: 'Juca',
  sentToPipedrive: false,
  products: [],
};

export const rawWonDeal: RawDealDto = {
  status: 'won',
  title: 'Product',
  value: 100,
  won_time: '2020-11-21 00:00:00',
  id: 1,
  person_name: 'Juca',
};

export const dealResponse: DealResponseDto = {
  success: true,
  data: [rawWonDeal],
};
