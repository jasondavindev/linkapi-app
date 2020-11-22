import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipedriveService } from './pipedrive.service';
import { Deal, DealSchema } from './schemas/deal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deal.name, schema: DealSchema }]),
  ],
  providers: [PipedriveService],
})
export class PipedriveModule {}
