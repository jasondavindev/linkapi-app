import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interval } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { Deal } from './schemas/deal.schema';
import { DealResponseDto } from './dto/deal.response.dto';
import { DealDto } from './dto/deal.dto';
import { PipedriveClientService } from './client/pipedrive.client.service';

const { PIPEDRIVE_JOB_DELAY } = process.env;

@Injectable()
export class PipedriveService {
  constructor(
    @InjectModel(Deal.name) private readonly dealModel: Model<Deal>,
    private readonly logger: PinoLogger,
    private readonly integrationClient: PipedriveClientService,
  ) {}

  @Interval(parseInt(PIPEDRIVE_JOB_DELAY, 10))
  async findDealsAndCreate(): Promise<Deal[]> {
    const deals = await this.getWonDeals();
    const createdDeals = await this.createDeals(deals);
    return createdDeals;
  }

  private async getWonDeals() {
    this.logger.info('PipeDriveService - calling pipedrive API to get deals');
    const response = await this.integrationClient.getWonDealsData();
    return this.convertDealsDto(response);
  }

  private convertDealsDto(responseData: DealResponseDto): DealDto[] {
    return responseData.data.map<DealDto>((deal) => ({
      pipeDriveId: deal.id,
      status: deal.status,
      title: deal.title,
      value: deal.value,
      wonTime: new Date(deal.won_time),
    }));
  }

  private async dealExists(deal: DealDto): Promise<boolean> {
    const result = await this.dealModel.findOne({
      pipeDriveId: deal.pipeDriveId,
    });

    return result !== null;
  }

  private async createDeals(dealsDto: DealDto[]): Promise<Deal[]> {
    const notExistingDeals = dealsDto.map(async (dealDto) => {
      const dealExists = await this.dealExists(dealDto);

      return dealExists ? null : dealDto;
    });

    const resolvedDeals = await Promise.all(notExistingDeals);
    const filteredDeals = resolvedDeals.filter((deal) => deal);

    this.logger.info(
      `PipeDriveService - creating deals -> ${JSON.stringify(filteredDeals)}`,
    );

    return this.dealModel.insertMany(filteredDeals);
  }
}
