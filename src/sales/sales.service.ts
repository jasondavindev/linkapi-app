import { Injectable } from '@nestjs/common';
import { DealService } from '../deal/deal.service';

@Injectable()
export class SalesService {
  constructor(private readonly dealService: DealService) {}

  async getSentSales() {
    return this.dealService.getDealsGroupByCreatedAt();
  }
}
