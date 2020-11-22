import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PinoLogger } from 'nestjs-pino';
import { Deal } from '../deal/schemas/deal.schema';
import { PipedriveClientService } from './client/pipedrive.client.service';
import { DealService } from '../deal/deal.service';
import { DealDto } from 'src/deal/dto/deal.dto';

const { PIPEDRIVE_JOB_DELAY } = process.env;

@Injectable()
export class PipedriveService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly integrationClient: PipedriveClientService,
    private readonly dealService: DealService,
  ) {}

  @Interval(parseInt(PIPEDRIVE_JOB_DELAY, 10))
  async findDealsAndCreate(): Promise<Deal[]> {
    const deals = await this.getWonDeals();
    const createdDeals = await this.dealService.createBulkDeals(deals);
    return createdDeals;
  }

  private async getWonDeals() {
    this.logger.info('PipeDriveService - calling pipedrive API to get deals');
    const response = await this.integrationClient.getWonDealsData();
    const deals = this.dealService.convertDealsDto(response);
    const populatedDealProducts = await this.populateDealsProducts(deals);
    return populatedDealProducts;
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

    const products = this.dealService.convertProductsToProductDto(data);

    return { ...deal, products };
  }
}
