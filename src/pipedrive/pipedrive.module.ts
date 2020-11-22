import { Module } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';
import { PipedriveClientModule } from './client/pipedrive.client.module';
import { DealModule } from '../deal/deal.module';

@Module({
  imports: [PipedriveClientModule, DealModule],
  providers: [PipedriveService],
})
export class PipedriveModule {}
