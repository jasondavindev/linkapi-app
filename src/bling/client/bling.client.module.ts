import { Module } from '@nestjs/common';
import { BlingClientService } from './bling.client.service';

@Module({
  providers: [BlingClientService],
  exports: [BlingClientService],
})
export class BlingClientModule {}
