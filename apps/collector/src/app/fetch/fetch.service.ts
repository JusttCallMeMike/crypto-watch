import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PairService, TickService } from '@crypto-watch/shared';
import axios from 'axios';
export interface binanceResponse {
  symbol: string;
  price: number;
}
@Injectable()
export class FetchService {
  constructor(
    private readonly PairService: PairService,
    private readonly TickService: TickService
  ) {}
  private readonly logger = new Logger(FetchService.name);

  @Cron('1 * * * * *')
  async handleCron() {
    this.logger.debug('getting prices');
    const pairs = await this.PairService.findAll();
    for (const pair of pairs) {
      try {
        this.logger.debug(`getting data for ${pair.name}`);

        const { data } = await axios.get<binanceResponse>(
          `https://api.binance.com/api/v3/ticker/price?symbol=${pair.name}`
        );

        this.logger.debug(JSON.stringify(data));

        // I dont await, since I dont care about result
        this.TickService.createForPair(pair, data.price);
      } catch (error) {
        this.logger.error(error);
      }
    }
  }
}
