import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipedriveService } from './pipedrive.service';
import { Deal, DealSchema } from './schemas/deal.schema';
import { PipedriveClientModule } from './client/pipedrive.client.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deal.name, schema: DealSchema }]),
    PipedriveClientModule,
  ],
  providers: [PipedriveService],
})
export class PipedriveModule {}
