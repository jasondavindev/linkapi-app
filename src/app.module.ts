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

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TerminusModule,
    PipedriveModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
