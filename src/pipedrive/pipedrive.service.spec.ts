import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { dealResponse, wonDeal } from '../__mocks__/deals';
import loggerConfig from '../common/logger.config';
import { PipedriveClientModule } from './client/pipedrive.client.module';
import { PipedriveClientService } from './client/pipedrive.client.service';
import { PipedriveService } from './pipedrive.service';
import { Deal } from './schemas/deal.schema';

describe('PipedriveService', () => {
  let pipedriveService: PipedriveService;
  let pipedriveClientService: PipedriveClientService;

  function mockDealModel() {
    /** */
  }
  mockDealModel.findOne = jest.fn();
  mockDealModel.insertMany = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PipedriveService,
        {
          provide: getModelToken(Deal.name),
          useValue: mockDealModel,
        },
      ],
      imports: [PipedriveClientModule, LoggerModule.forRoot(loggerConfig)],
    }).compile();

    pipedriveService = module.get<PipedriveService>(PipedriveService);
    pipedriveClientService = module.get<PipedriveClientService>(
      PipedriveClientService,
    );
  });

  it('should create and return a populated create deals', async () => {
    jest
      .spyOn(pipedriveClientService, 'getWonDealsData')
      .mockResolvedValueOnce(dealResponse);
    jest.spyOn(mockDealModel, 'findOne').mockReturnValueOnce(null);
    jest.spyOn(mockDealModel, 'insertMany').mockReturnValueOnce([wonDeal]);

    const createdDeals = await pipedriveService.findDealsAndCreate();

    expect(createdDeals.length).toBe(1);
  });

  it('should create and return an empty list when the deal already exists', async () => {
    jest
      .spyOn(pipedriveClientService, 'getWonDealsData')
      .mockResolvedValueOnce(dealResponse);
    jest.spyOn(mockDealModel, 'findOne').mockReturnValueOnce(wonDeal);
    jest.spyOn(mockDealModel, 'insertMany').mockReturnValueOnce([]);

    const createdDeals = await pipedriveService.findDealsAndCreate();

    expect(createdDeals.length).toBe(0);
  });
});
