import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PinoLogger } from 'nestjs-pino';
import { DealService } from '../deal/deal.service';
import { BlingClientService } from './client/bling.client.service';

import {
  convertDealsToOrders,
  convertOrdersToXML,
} from './converter/bling.converter';

const { BLING_JOB_DELAY } = process.env;

@Injectable()
export class BlingService {
  constructor(
    private readonly blingClientService: BlingClientService,
    private readonly dealService: DealService,
    private readonly logger: PinoLogger,
  ) {}

  @Interval(parseInt(BLING_JOB_DELAY, 10) || 10000)
  async ordersCreatorJob() {
    this.logger.info('BlingService - finding not sent deals');

    const notSentDeals = await this.dealService.getNotSentDeals();

    this.logger.info(
      `BlingService - found ${notSentDeals.length} deals not sent`,
    );

    const orders = convertDealsToOrders(notSentDeals);
    const ordersXML = convertOrdersToXML(orders);
    await this.sendOrdersToBlingApi(ordersXML);
    const result = await this.dealService.updateDealsSentStatus(notSentDeals);

    this.logger.info('BlingService - Finish job. Updating deals');
    return result;
  }

  async sendOrdersToBlingApi(orders: string[]) {
    this.logger.info('BlingService - sending orders to BlingAPI');

    const createdOrders = this.createOrders(orders);

    try {
      return Promise.all(createdOrders);
    } catch (error) {
      this.logger.error('BlingService - error creating order error=', error);
      throw error;
    }
  }

  async createOrder(order: string) {
    return this.blingClientService.createOrder(order);
  }

  createOrders(ordersXML: string[]) {
    return ordersXML.map(async (order) => this.createOrder(order));
  }
}
