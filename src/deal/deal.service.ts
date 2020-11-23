import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { DealDto } from './dto/deal.dto';
import { Deal } from './schemas/deal.schema';

@Injectable()
export class DealService {
  constructor(
    @InjectModel(Deal.name) private readonly dealModel: Model<Deal>,
    private readonly logger: PinoLogger,
  ) {}

  async dealExists(deal: DealDto): Promise<boolean> {
    const result = await this.dealModel.findOne({
      pipeDriveId: deal.pipeDriveId,
    });

    return result !== null;
  }

  async createBulkDeals(dealsDto: DealDto[]): Promise<Deal[]> {
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

  async getNotSentDeals() {
    return this.dealModel.find({ sentToPipedrive: false });
  }

  async updateDealsSentStatus(deals: Deal[]) {
    return Promise.all(
      deals.map((deal) => {
        deal.sentToPipedrive = true;
        return deal.save();
      }),
    );
  }
}
