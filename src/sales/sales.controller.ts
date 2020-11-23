import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { DealAggregatedByCreatedAtDto } from '../deal/dto/deal.aggregation.dto';

@ApiTags('Sales')
@Controller('v1/sales')
@UseInterceptors(CacheInterceptor)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all sales sent to Bling API',
  })
  @ApiOkResponse({
    description: 'Sales returned',
    type: [DealAggregatedByCreatedAtDto],
  })
  @CacheTTL(60000) // Redis cache
  private async getSentSales() {
    return this.salesService.getSentSales();
  }
}
