import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { Deal } from '../deal/schemas/deal.schema';
import loggerConfig from '../common/logger.config';
import { DealModule } from '../deal/deal.module';
import { BlingService } from './bling.service';
import { BlingClientModule } from './client/bling.client.module';
import { BlingClientService } from './client/bling.client.service';
import { AxiosResponse } from 'axios';
import { OrderResponseDto } from './dto/order.response.dto';
import { wonDeal } from '../__mocks__/deals';

describe('BlingService', () => {
  let service: BlingService;
  let blingClientService: BlingClientService;

  function mockDealModel() {
    /** */
  }
  mockDealModel.findOne = jest.fn();
  mockDealModel.insertMany = jest.fn();
  mockDealModel.find = jest.fn();

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
      data: { retorno: { pedidos: [] } },
    } as AxiosResponse<OrderResponseDto>;

    jest.spyOn(blingClientService, 'createOrder').mockResolvedValueOnce(result);
    expect(service.createOrder('<pedido>')).resolves.toEqual(result);
  });

  it('should call the bling api to create order list', async () => {
    const result = {
      data: { retorno: { pedidos: [] } },
    } as AxiosResponse<OrderResponseDto>;

    jest.spyOn(blingClientService, 'createOrder').mockResolvedValueOnce(result);
    expect(await Promise.all(service.createOrders(['<pedido>']))).toEqual([
      result,
    ]);
  });

  it('should create the orders and return result', () => {
    const result = {
      data: { retorno: { pedidos: [] } },
    } as AxiosResponse<OrderResponseDto>;

    jest.spyOn(blingClientService, 'createOrder').mockResolvedValueOnce(result);

    expect(service.sendOrdersToBlingApi(['<pedido>'])).resolves.toEqual([
      result,
    ]);
  });

  it('should throw an error when the creation fails', () => {
    const error = new Error('api error');

    jest.spyOn(blingClientService, 'createOrder').mockImplementationOnce(() => {
      throw error;
    });

    expect(service.sendOrdersToBlingApi(['<pedido>'])).rejects.toThrowError(
      error,
    );
  });

  it('should send deals to bling api and update the sent status', async () => {
    const deal: Deal = {
      ...wonDeal,
      save: jest.fn().mockImplementationOnce(async () => deal),
    } as any;

    jest.spyOn(mockDealModel, 'find').mockReturnValueOnce([deal]);
    jest
      .spyOn(blingClientService, 'createOrder')
      .mockImplementationOnce(async (d) => Promise.resolve({ data: d } as any));

    const result = await service.ordersCreatorJob();
    expect(result[0].sentToPipedrive).toBeTruthy();
  });
});
