import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { dealResponse, wonDeal } from '../__mocks__/deals';
import loggerConfig from '../common/logger.config';
import { PipedriveClientModule } from './client/pipedrive.client.module';
import { PipedriveClientService } from './client/pipedrive.client.service';
import { PipedriveService } from './pipedrive.service';
import { Deal } from '../deal/schemas/deal.schema';
import { DealModule } from '../deal/deal.module';
import { productResponse } from '../__mocks__/products';

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
      providers: [PipedriveService],
      imports: [
        PipedriveClientModule,
        LoggerModule.forRoot(loggerConfig),
        DealModule,
      ],
    })
      .overrideProvider(getModelToken(Deal.name))
      .useValue(mockDealModel)
      .compile();

    pipedriveService = module.get<PipedriveService>(PipedriveService);
    pipedriveClientService = module.get<PipedriveClientService>(
      PipedriveClientService,
    );
  });

  it('should create and return a populated create deals', async () => {
    jest
      .spyOn(pipedriveClientService, 'getWonDealsData')
      .mockResolvedValueOnce(dealResponse);
    jest
      .spyOn(pipedriveClientService, 'getProductsData')
      .mockResolvedValueOnce(productResponse);
    jest.spyOn(mockDealModel, 'findOne').mockReturnValueOnce(null);
    jest.spyOn(mockDealModel, 'insertMany').mockReturnValueOnce([wonDeal]);

    const createdDeals = await pipedriveService.dealsCreatorJob();

    expect(createdDeals.length).toBe(1);
  });

  it('should return an empty list when the deal already exists', async () => {
    jest
      .spyOn(pipedriveClientService, 'getWonDealsData')
      .mockResolvedValueOnce(dealResponse);
    jest
      .spyOn(pipedriveClientService, 'getProductsData')
      .mockResolvedValueOnce(productResponse);
    jest.spyOn(mockDealModel, 'findOne').mockReturnValueOnce(wonDeal);
    jest.spyOn(mockDealModel, 'insertMany').mockReturnValueOnce([]);

    const createdDeals = await pipedriveService.dealsCreatorJob();

    expect(createdDeals.length).toBe(0);
  });

  it('should return the deal itself if products not found', async () => {
    jest
      .spyOn(pipedriveClientService, 'getWonDealsData')
      .mockResolvedValueOnce(dealResponse);
    jest
      .spyOn(pipedriveClientService, 'getProductsData')
      .mockResolvedValueOnce({ data: null, success: false });
    jest.spyOn(mockDealModel, 'findOne').mockReturnValueOnce(null);
    jest.spyOn(mockDealModel, 'insertMany').mockReturnValueOnce([wonDeal]);

    const createdDeals = await pipedriveService.dealsCreatorJob();
    expect(createdDeals.length).toBe(1);
    expect(createdDeals[0].products).toEqual([]);
  });
});
