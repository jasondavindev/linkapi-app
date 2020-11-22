import * as js2xmlparser from 'js2xmlparser';
import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PinoLogger } from 'nestjs-pino';
import { DealService } from 'src/deal/deal.service';
import { DealDto } from 'src/deal/dto/deal.dto';
import { ProductDto } from 'src/deal/dto/product.dto';
import { BlingClientService } from './client/bling.client.service';
import { OrderDto, OrderItemDto } from './dto/order.dto';

@Injectable()
export class BlingService {
  constructor(
    private readonly blingClientService: BlingClientService,
    private readonly dealService: DealService,
    private readonly logger: PinoLogger,
  ) {}

  @Interval(2000)
  async sendOrdersToBling() {
    const deals = await this.dealService.getNotSentDeals();
    const orders = deals.map((deal) => this.convertToOrderDto(deal));
    const ordersToXML = this.parseOrdersToXML(orders);

    this.logger.info('BlingService - sending orders to BlingAPI');

    await Promise.all(this.createOrders(ordersToXML));
  }

  async createOrder(order: string) {
    return this.blingClientService.createOrder(order);
  }

  createOrders(ordersXML: string[]) {
    return ordersXML.map(async (order) => this.createOrder(order));
  }

  parseOrdersToXML(orders: OrderDto[]): string[] {
    return orders.map((order) => js2xmlparser.parse('pedido', order));
  }

  convertToOrderDto(dealDto: DealDto): OrderDto {
    return {
      cliente: { nome: dealDto.personName },
      volumes: [
        { volume: { service: 'SEDEX - CONTRATO', codigoRastreamento: '' } },
      ],
      itens: this.convertItems(dealDto.products),
      parcelas: [],
    };
  }

  convertItems(products: ProductDto[]) {
    return products.map<OrderItemDto>((product) => ({
      item: {
        codigo: String(product.id),
        descricao: product.name,
        qtde: product.quantity,
        un: 'Pç',
        vlr_unit: product.price,
      },
    }));
  }
}
