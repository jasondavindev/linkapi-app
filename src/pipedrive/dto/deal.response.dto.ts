import { RawDealDto } from './raw.deal.dto';

export interface DealResponseDto {
  success: boolean;
  data: RawDealDto[];
}
