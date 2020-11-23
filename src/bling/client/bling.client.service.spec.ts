import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { BlingClientService } from './bling.client.service';

jest.mock('axios');

describe('BlingClientService', () => {
  let service: BlingClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlingClientService],
    }).compile();

    service = module.get<BlingClientService>(BlingClientService);
  });

  afterAll(() => jest.clearAllMocks());

  it('should call Bling api to create order', () => {
    const result = { retorno: { success: true } };

    jest.spyOn(axios, 'post').mockResolvedValueOnce(result);

    expect(service.createOrder('<pedido>')).resolves.toEqual(result);
  });
});
