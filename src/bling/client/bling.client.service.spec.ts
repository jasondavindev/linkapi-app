import { Test, TestingModule } from '@nestjs/testing';
import { BlingClientService } from './bling.client.service';

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

    Object.defineProperty(service, 'client', {
      value: { post: jest.fn().mockReturnValueOnce(result) },
    });

    expect(service.createOrder('<pedido>')).resolves.toEqual(result);
  });
});
