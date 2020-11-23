import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { Deal } from '../deal/schemas/deal.schema';
import loggerConfig from '../common/logger.config';
import { DealModule } from '../deal/deal.module';
import { BlingService } from './bling.service';
import { BlingClientModule } from './client/bling.client.module';
import { BlingClientService } from './client/bling.client.service';
import { AxiosInstance, AxiosResponse } from 'axios';

describe('BlingService', () => {
  let service: BlingService;
  let blingClientService: BlingClientService;

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
    blingClientService = module.get<BlingClientService>(BlingClientService);
  });

  it('should call the bling api to create order', () => {
    const result = {
      data: { retorno: { success: true } },
    } as any;

    jest.spyOn(blingClientService, 'createOrder').mockResolvedValueOnce(result);
    expect(service.createOrder('<pedido>')).resolves.toEqual(result);
  });

  it('should call the bling api to create order list', async () => {
    const result = {
      data: { retorno: { success: true } },
    } as any;

    jest.spyOn(blingClientService, 'createOrder').mockResolvedValueOnce(result);
    expect(await Promise.all(service.createOrders(['<pedido>']))).toEqual([
      result,
    ]);
  });
});
