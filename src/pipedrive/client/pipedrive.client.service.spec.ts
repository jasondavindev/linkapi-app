import axios, { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { dealResponse } from '../../__mocks__/deals';
import { PipedriveClientService } from './pipedrive.client.service';
import { DealResponseDto } from '../../deal/dto/deal.response.dto';

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
});
