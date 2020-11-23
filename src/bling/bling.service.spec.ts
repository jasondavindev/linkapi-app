import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { Deal } from '../deal/schemas/deal.schema';
import loggerConfig from '../common/logger.config';
import { DealModule } from '../deal/deal.module';
import { BlingService } from './bling.service';
import { BlingClientModule } from './client/bling.client.module';

describe('BlingService', () => {
  let service: BlingService;

  function mockDealModel() {
    /** */
  }
  mockDealModel.findOne = jest.fn();
  mockDealModel.insertMany = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlingService],
      imports: [
        DealModule,
        BlingClientModule,
        LoggerModule.forRoot(loggerConfig),
      ],
    })
      .overrideProvider(getModelToken(Deal.name))
      .useValue(mockDealModel)
      .compile();

    service = module.get<BlingService>(BlingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
