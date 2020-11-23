import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';

const { BLING_API_URL, BLING_USER_API_KEY } = process.env;

@Injectable()
export class BlingClientService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BLING_API_URL,
      params: {
        apikey: BLING_USER_API_KEY,
      },
    });
  }

  async createOrder(orderXML: string) {
    return this.client.post(
      `/Api/v2/pedido/json?xml=${encodeURI(orderXML)}`,
      null,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
