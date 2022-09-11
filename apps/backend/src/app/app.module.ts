import { PairService, SharedModule } from '@crypto-watch/shared';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
