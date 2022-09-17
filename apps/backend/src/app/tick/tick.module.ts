import { SharedModule } from '@crypto-watch/shared';
import { Module } from '@nestjs/common';
import { TickResolver } from './tick.resolver';

@Module({ imports: [SharedModule], providers: [TickResolver] })
export class TickModule {}
