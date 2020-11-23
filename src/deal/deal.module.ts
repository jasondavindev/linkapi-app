import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Deal, DealSchema } from './schemas/deal.schema';
import { DealService } from './deal.service';

@Module({
  providers: [DealService],
  imports: [
    MongooseModule.forFeature([{ name: Deal.name, schema: DealSchema }]),
  ],
  exports: [DealService],
})
export class DealModule {}
