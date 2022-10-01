import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PairService } from './pair/pair.service'
import { Pair, PairSchema } from './pair/schemas/pair.schema'
import { Tick, TickSchema } from './pair/schemas/tick.schema'
import { TickService } from './pair/tick.service'
import config from '@config'
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pair.name, schema: PairSchema },
      { name: Tick.name, schema: TickSchema },
    ]),
    MongooseModule.forRoot(config.db),
  ],
  providers: [PairService, TickService],
  exports: [PairService, TickService],
})
export class DbModule {}
