import {DbModule} from '@crypto-watch/db';
import { Module } from '@nestjs/common';
import { TickResolver } from './tick.resolver';

@Module({ imports: [DbModule], providers: [TickResolver] })
export class TickModule {}
