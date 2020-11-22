import { Module } from '@nestjs/common';
import { DealModule } from '../deal/deal.module';
import { BlingService } from './bling.service';
import { BlingClientModule } from './client/bling.client.module';

@Module({
  providers: [BlingService],
  imports: [BlingClientModule, DealModule],
})
export class BlingModule {}
