import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { dealResponse, wonDeal } from '../__mocks__/deals';
import loggerConfig from '../common/logger.config';
import { DealService } from './deal.service';
import { Deal } from './schemas/deal.schema';

describe('DealService', () => {
  let service: DealService;

  function mockDealModel() {
    /** */
  }
  mockDealModel.findOne = jest.fn();
  mockDealModel.insertMany = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DealService,
        {
          provide: getModelToken(Deal.name),
          useValue: mockDealModel,
        },
      ],
      imports: [LoggerModule.forRoot(loggerConfig)],
    }).compile();

    service = module.get<DealService>(DealService);
  });

  it('should convert raw data to dto', () => {
    expect(service.convertDealsDto(dealResponse)[0]).toEqual(wonDeal);
  });

  it('should return if the deal record exists', () => {
    jest.spyOn(mockDealModel, 'findOne').mockReturnValueOnce(null);
    expect(service.dealExists(wonDeal)).resolves.toEqual(false);

    jest.spyOn(mockDealModel, 'findOne').mockResolvedValueOnce(wonDeal);
    expect(service.dealExists(wonDeal)).resolves.toEqual(true);
  });

  it('should create deals that do not exists', async () => {
    jest.spyOn(mockDealModel, 'findOne').mockReturnValueOnce(null);
    await service.createBulkDeals([wonDeal]);

    expect(mockDealModel.insertMany).toBeCalledWith([wonDeal]);
  });
});
