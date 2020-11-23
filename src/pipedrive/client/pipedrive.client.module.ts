import { Module } from '@nestjs/common';
import { PipedriveClientService } from './pipedrive.client.service';

@Module({
  providers: [PipedriveClientService],
  exports: [PipedriveClientService],
})
export class PipedriveClientModule {}
