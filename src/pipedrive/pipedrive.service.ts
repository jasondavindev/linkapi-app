import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PinoLogger } from 'nestjs-pino';
import { Deal } from '../deal/schemas/deal.schema';
import { PipedriveClientService } from './client/pipedrive.client.service';
import { DealService } from '../deal/deal.service';
import { DealDto } from '../deal/dto/deal.dto';
import {
  convertDealResponseToDealsDto,
  convertRawProductsToProductDto,
} from './converter/pipedrive.converter';

const { PIPEDRIVE_JOB_DELAY } = process.env;

@Injectable()
export class PipedriveService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly integrationClient: PipedriveClientService,
    private readonly dealService: DealService,
  ) {}

  @Interval(parseInt(PIPEDRIVE_JOB_DELAY, 10) || 10000)
  async dealsCreatorJob(): Promise<Deal[]> {
    const response = await this.getWonDeals();
    const deals = convertDealResponseToDealsDto(response);
    const populatedDealProducts = await this.populateDealsProducts(deals);
    return this.dealService.createBulkDeals(populatedDealProducts);
  }

  private async getWonDeals() {
    this.logger.info('PipeDriveService - calling pipedrive API to get deals');
    return this.integrationClient.getWonDealsData();
  }

  private async populateDealsProducts(deals: DealDto[]) {
    const dealsPromise = deals.map<Promise<DealDto>>(async (deal) =>
      this.populateDealProducts(deal),
    );
    return Promise.all(dealsPromise);
  }

  private async populateDealProducts(deal: DealDto) {
    const { data } = await this.integrationClient.getProductsData(deal);

    if (data === null) return deal;

    const products = convertRawProductsToProductDto(data);

    return { ...deal, products };
  }
}
