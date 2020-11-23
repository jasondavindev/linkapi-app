import axios, { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { dealResponse, wonDeal } from '../../__mocks__/deals';
import { PipedriveClientService } from './pipedrive.client.service';
import { DealResponseDto } from '../../deal/dto/deal.response.dto';
import { productResponse } from '../../__mocks__/products';
import { ProductsResponseDto } from '../../deal/dto/products.response.dto';

jest.mock('axios');

describe('PipedriveClientService', () => {
  let service: PipedriveClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PipedriveClientService],
    }).compile();

    service = module.get<PipedriveClientService>(PipedriveClientService);
  });

  it('should return deals list', () => {
    jest.spyOn(service, 'getWonDeals').mockReturnValueOnce(dealResponse as any);
    expect(service.getWonDealsData()).resolves.toEqual(dealResponse.data);
  });

  it('should return a response with deal response', async () => {
    const data: AxiosResponse<DealResponseDto> = {
      data: dealResponse,
    } as AxiosResponse<DealResponseDto>;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(data);
    expect(service.getWonDeals()).resolves.toEqual(data);
  });

  it('should return products deal list', () => {
    jest
      .spyOn(service, 'getProducts')
      .mockReturnValueOnce(productResponse as any);
    expect(service.getProductsData(wonDeal)).resolves.toEqual(
      productResponse.data,
    );
  });

  it('should return a response with products response', async () => {
    const data: AxiosResponse<ProductsResponseDto> = {
      data: productResponse,
    } as AxiosResponse<ProductsResponseDto>;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(data);
    expect(service.getProducts(wonDeal)).resolves.toEqual(data);
  });
});
