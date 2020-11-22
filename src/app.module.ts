import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import loggerConfig from './common/logger.config';
import { HealthController } from './health/health.controller';
import { PipedriveModule } from './pipedrive/pipedrive.module';
import { BlingModule } from './bling/bling.module';
import { DealService } from './deal/deal.service';
import { DealModule } from './deal/deal.module';
import { Deal, DealSchema } from './deal/schemas/deal.schema';

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TerminusModule,
    DealModule,
    PipedriveModule,
    BlingModule,
    MongooseModule.forFeature([{ name: Deal.name, schema: DealSchema }]),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, DealService],
})
export class AppModule {}
