import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PairService } from './pair/pair.service';
import { Pair, PairSchema } from './pair/schemas/pair.schema';
import { Tick, TickSchema } from './pair/schemas/tick.schema';
import { TickService } from './pair/tick.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pair.name, schema: PairSchema },
      { name: Tick.name, schema: TickSchema },
    ]),
    MongooseModule.forRoot('mongodb://docker:mongopw@localhost:55000'),
  ],
  providers: [PairService, TickService],
  exports: [PairService, TickService],
})
export class SharedModule {}
