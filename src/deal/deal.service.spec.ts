import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
