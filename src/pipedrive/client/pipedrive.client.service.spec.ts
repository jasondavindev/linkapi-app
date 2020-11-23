import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { dealResponse, wonDeal } from '../../__mocks__/deals';
import { PipedriveClientService } from './pipedrive.client.service';
import { DealResponseDto } from '../../deal/dto/deal.response.dto';
import { productResponse } from '../../__mocks__/products';
import { ProductsResponseDto } from '../../deal/dto/products.response.dto';

describe('PipedriveClientService', () => {
  let service: PipedriveClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PipedriveClientService],
    }).compile();

    service = module.get<PipedriveClientService>(PipedriveClientService);
  });

  it('should return deals list', () => {
    Object.defineProperty(service, 'client', {
      value: { get: jest.fn().mockReturnValueOnce(dealResponse) },
    });

    expect(service.getWonDealsData()).resolves.toEqual(dealResponse.data);
  });

  it('should return a response with deal response', async () => {
    const data: AxiosResponse<DealResponseDto> = {
      data: dealResponse,
    } as AxiosResponse<DealResponseDto>;

    Object.defineProperty(service, 'client', {
      value: { get: jest.fn().mockReturnValueOnce(data) },
    });

    expect(service.getWonDeals()).resolves.toEqual(data);
  });

  it('should return products deal list', () => {
    Object.defineProperty(service, 'client', {
      value: { get: jest.fn().mockReturnValueOnce(productResponse) },
    });

    expect(service.getProductsData(wonDeal)).resolves.toEqual(
      productResponse.data,
    );
  });

  it('should return a response with products response', async () => {
    const data: AxiosResponse<ProductsResponseDto> = {
      data: productResponse,
    } as AxiosResponse<ProductsResponseDto>;

    Object.defineProperty(service, 'client', {
      value: { get: jest.fn().mockReturnValueOnce(data) },
    });

    expect(service.getProducts(wonDeal)).resolves.toEqual(data);
  });
});
