import { SharedModule } from '@crypto-watch/shared';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FetchService } from './fetch.service';

@Module({
  imports: [ScheduleModule.forRoot(), SharedModule],
  controllers: [],
  providers: [FetchService],
})
export class FetchModule {}
