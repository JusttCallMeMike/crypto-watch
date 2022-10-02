import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Candle } from './schemas/candle.schema'
import { Pair } from './schemas/pair.schema'

@Injectable()
export class CandleService {
  constructor(
    @InjectModel(Candle.name) private readonly candleModel: Model<Candle>
  ) {}

  async create(candle: Candle): Promise<Candle> {
    const createdCandle = new this.candleModel(candle)
    return createdCandle.save()
  }
  async createForPair(
    pair: Pair,
    open: number,
    close: number,
    high: number,
    low: number,
    interval: number
  ): Promise<Candle> {
    const createdCandle = new this.candleModel({
      pair,
      open,
      close,
      high,
      low,
      interval,
    })
    return createdCandle.save()
  }
  async findAll(pair: Pair, from: Date, to: Date): Promise<Candle[]> {
    return this.candleModel
      .find({ pair, created_on: { $gte: from, $lt: to } })
      .sort('createdAt')
      .exec()
  }
  async remove(pair: Pair, from: Date, to: Date): Promise<Candle[]> {
    return this.candleModel
      .find({ pair, created_on: { $gte: from, $lt: to } })
      .deleteMany()
      .exec()
  }
}
