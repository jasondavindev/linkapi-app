import { DealDto } from '../../deal/dto/deal.dto';
import { DealResponseDto } from '../../deal/dto/deal.response.dto';
import { ProductDto } from '../../deal/dto/product.dto';
import { RawDealDto } from '../../deal/dto/raw.deal.dto';
import { RawProductDto } from '../../deal/dto/raw.product.dto';

export const convertDealResponseToDealDto = (rawDeal: RawDealDto): DealDto => ({
  pipeDriveId: rawDeal.id,
  status: rawDeal.status,
  title: rawDeal.title,
  value: rawDeal.value,
  wonTime: new Date(rawDeal.won_time),
  personName: rawDeal.person_name,
});

export const convertDealResponseToDealsDto = (
  responseData: DealResponseDto,
): DealDto[] => responseData.data.map<DealDto>(convertDealResponseToDealDto);

export const convertRawProductsToProductDto = (
  productsDto: RawProductDto[],
): ProductDto[] => productsDto.map<ProductDto>(convertRawProductToProductDto);

export const convertRawProductToProductDto = (
  product: RawProductDto,
): ProductDto => ({
  id: product.product_id,
  name: product.name,
  price: product.item_price,
  quantity: product.quantity,
});
