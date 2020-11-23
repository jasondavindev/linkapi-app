import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { DealModule } from '../deal/deal.module';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

const { REDIS_HOST, REDIS_PORT } = process.env;

@Module({
  providers: [SalesService],
  imports: [
    DealModule,
    CacheModule.register({
      store: redisStore,
      host: REDIS_HOST,
      port: REDIS_PORT,
    }),
  ],
  controllers: [SalesController],
})
export class SalesModule {}
