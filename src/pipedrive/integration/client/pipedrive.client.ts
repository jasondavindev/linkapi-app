import axios, { AxiosInstance } from 'axios';

const { PIPEDRIVE_API_URL, PIPEDRIVE_API_TOKEN } = process.env;

class PipeDriveClient {
  constructor(private readonly client?: AxiosInstance) {
    this.client = axios.create({
      baseURL: PIPEDRIVE_API_URL,
      params: {
        api_token: PIPEDRIVE_API_TOKEN,
      },
    });
  }

  async getWonDeals() {
    const { data } = await this.client.get('/v1/deals?status=won');
    return data;
  }
}

export const pipeDriveClient = new PipeDriveClient();
