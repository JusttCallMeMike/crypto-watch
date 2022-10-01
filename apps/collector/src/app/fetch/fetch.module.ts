import { DbModule } from '@crypto-watch/db'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { FetchService } from './fetch.service'

@Module({
  imports: [ScheduleModule.forRoot(), DbModule],
  controllers: [],
  providers: [FetchService],
})
export class FetchModule {}
