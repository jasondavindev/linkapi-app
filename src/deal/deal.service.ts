import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { DealDto } from './dto/deal.dto';
import { DealResponseDto } from './dto/deal.response.dto';
import { ProductDto } from './dto/product.dto';
import { RawProductDto } from './dto/raw.product.dto';
import { Deal } from './schemas/deal.schema';

@Injectable()
export class DealService {
  constructor(
    @InjectModel(Deal.name) private readonly dealModel: Model<Deal>,
    private readonly logger: PinoLogger,
  ) {}

  convertDealsDto(responseData: DealResponseDto): DealDto[] {
    return responseData.data.map<DealDto>((deal) => ({
      pipeDriveId: deal.id,
      status: deal.status,
      title: deal.title,
      value: deal.value,
      wonTime: new Date(deal.won_time),
      personName: deal.person_name,
    }));
  }

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

  convertProductsToProductDto(productsDto: RawProductDto[]): ProductDto[] {
    return productsDto.map<ProductDto>((product) => ({
      id: product.product_id,
      name: product.name,
      price: product.item_price,
      quantity: product.quantity,
    }));
  }

  async getNotSentDeals() {
    return this.dealModel.find();
  }
}
