import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { PairService, TickService, CandleService } from '@crypto-watch/db'
import axios from 'axios'
export interface binanceResponse {
  symbol: string
  price: number
}
@Injectable()
export class FetchService {
  constructor(
    private readonly PairService: PairService,
    private readonly TickService: TickService,
    private readonly CandleService: CandleService
  ) {}
  private readonly logger = new Logger(FetchService.name)

  @Cron('1 * * * * *')
  async handleCron() {
    this.logger.debug('getting prices')
    const pairs = await this.PairService.findAll()
    for (const pair of pairs) {
      try {
        this.logger.debug(`getting data for ${pair.name}`)

        const { data } = await axios.get<binanceResponse>(
          `https://api.binance.com/api/v3/ticker/price?symbol=${pair.name}`
        )

        this.logger.debug(JSON.stringify(data))

        // I dont await, since I dont care about result
        this.TickService.createForPair(pair, data.price)
      } catch (error) {
        this.logger.error(error)
      }
    }
  }
  @Cron('1 */5 * * * *')
  async handleCronfor5Min() {
    await this.calculateCandles(5)
  }
  @Cron('1 */15 * * * *')
  async handleCronfor15Min() {
    await this.calculateCandles(15)
  }
  @Cron('1 */30 * * * *')
  async handleCronfor30Min() {
    await this.calculateCandles(30)
  }

  async calculateCandles(interval: number) {
    const pairs = await this.PairService.findAll()
    const to = new Date()
    const from = new Date(to.getTime() - interval * 60_000)
    for (const pair of pairs) {
      try {
        this.logger.debug(
          `calculating ${interval} min candles for ${pair.name}`
        )
        const ticks = (await this.TickService.findAll(pair, from, to)).map(
          (tick) => tick.price
        )
        const open = ticks[0]
        const close = ticks[ticks.length - 1]
        const low = Math.min(...ticks)
        const high = Math.max(...ticks)

        this.CandleService.createForPair(pair, open, close, high, low, interval)

        this.logger.debug(JSON.stringify({ open, close, high, low }, null, 2))
      } catch (error) {
        this.logger.error(error)
      }
    }
  }
}
