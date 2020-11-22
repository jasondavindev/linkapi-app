import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { DealDto } from 'src/deal/dto/deal.dto';
import { ProductsResponseDto } from 'src/deal/dto/products.response.dto';
import { DealResponseDto } from '../../deal/dto/deal.response.dto';

const { PIPEDRIVE_API_URL, PIPEDRIVE_API_TOKEN } = process.env;

@Injectable()
export class PipedriveClientService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: PIPEDRIVE_API_URL,
      params: {
        api_token: PIPEDRIVE_API_TOKEN,
      },
    });
  }

  async getWonDeals() {
    return this.client.get<DealResponseDto>('/v1/deals?status=won');
  }

  async getWonDealsData() {
    const { data } = await this.getWonDeals();
    return data;
  }

  async getProducts(dealDto: DealDto) {
    return this.client.get<ProductsResponseDto>(
      `/v1/deals/${dealDto.pipeDriveId}/products`,
    );
  }

  async getProductsData(dealDto: DealDto) {
    const { data } = await this.getProducts(dealDto);
    return data;
  }
}
