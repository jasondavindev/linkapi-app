import * as js2xmlparser from 'js2xmlparser';
import { DealDto } from '../../deal/dto/deal.dto';
import { ProductDto } from '../../deal/dto/product.dto';
import { OrderDto, OrderItemDto } from '../dto/order.dto';

export const convertOrdersToXML = (orders: OrderDto[]): string[] =>
  orders.map(convertOrderToXML);

export const convertOrderToXML = (order: OrderDto) =>
  js2xmlparser.parse('pedido', order);

export const convertDealsToOrders = (deals: DealDto[]) =>
  deals.map(convertDealToOrder);

export const convertDealToOrder = (dealDto: DealDto): OrderDto => ({
  cliente: { nome: dealDto.personName },
  volumes: [
    { volume: { service: 'SEDEX - CONTRATO', codigoRastreamento: '' } },
  ],
  itens: convertProductsToItems(dealDto.products),
  parcelas: [],
});

export const convertProductsToItems = (products: ProductDto[]) =>
  products.map<OrderItemDto>(convertProductToItem);

export const convertProductToItem = (product: ProductDto) => ({
  item: {
    codigo: String(product.id),
    descricao: product.name,
    qtde: product.quantity,
    un: 'Pç',
    vlr_unit: product.price,
  },
});
