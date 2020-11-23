import { Test, TestingModule } from '@nestjs/testing';
import { sales } from '../__mocks__/sales';
import { DealModule } from '../deal/deal.module';
import { DealService } from '../deal/deal.service';
import { SalesService } from './sales.service';
import { LoggerModule } from 'nestjs-pino';
import loggerConfig from '../common/logger.config';
import { getModelToken } from '@nestjs/mongoose';
import { Deal } from '../deal/schemas/deal.schema';
import { wonDeal } from '../__mocks__/deals';

describe('SalesService', () => {
  let salesService: SalesService;
  let dealService: DealService;

  function mockDealModel() {
    /** */
  }
  mockDealModel.aggregate = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesService],
      imports: [DealModule, LoggerModule.forRoot(loggerConfig)],
    })
      .overrideProvider(getModelToken(Deal.name))
      .useValue(mockDealModel)
      .compile();

    salesService = module.get<SalesService>(SalesService);
    dealService = module.get<DealService>(DealService);
  });

  it('should return a list of sent deals as sales', async () => {
    jest
      .spyOn(dealService, 'getDealsGroupByCreatedAt')
      .mockResolvedValueOnce(sales);

    const result = await salesService.getSentSales();

    expect(result).toEqual(sales);
    expect(result[0].sales[0]).toEqual(wonDeal);
  });
});
