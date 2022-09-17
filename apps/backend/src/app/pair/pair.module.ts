import { DbModule } from '@crypto-watch/db';
import { Module } from '@nestjs/common';
import { PairResolver } from './pair.resolver';

@Module({
  imports: [DbModule],
  providers: [PairResolver],
})
export class PairModule {}
