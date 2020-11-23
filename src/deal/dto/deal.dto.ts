import { ProductDto } from './product.dto';

export interface DealDto {
  pipeDriveId: number;
  title: string;
  status: string;
  value: number;
  wonTime: Date;
  personName: string;
  products?: ProductDto[];
  sentToPipedrive?: boolean;
}
