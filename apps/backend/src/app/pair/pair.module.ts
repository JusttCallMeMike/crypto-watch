import { SharedModule } from '@crypto-watch/shared';
import { Module } from '@nestjs/common';
import { PairResolver } from './pair.resolver';

@Module({
  imports: [SharedModule],
  providers: [PairResolver],
})
export class PairModule {}
