import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PinoLogger } from 'nestjs-pino';
import { Deal } from '../deal/schemas/deal.schema';
import { PipedriveClientService } from './client/pipedrive.client.service';
import { DealService } from '../deal/deal.service';

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
    return this.dealService.convertDealsDto(response);
  }
}
