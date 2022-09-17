import { Pair, PairService } from '@crypto-watch/shared';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class AppService {
  constructor(private readonly pairService: PairService) {}
  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }
  private readonly logger = new Logger(AppService.name);

  async createPair(pair: Pair) {
    try {
      this.logger.debug(`getting data for ${pair.name}`);

      await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${pair.name}`
      );
      return await this.pairService.create(pair);
    } catch (error) {
      this.logger.error(error);
      // FIXME: should handle duplicate error
      throw new BadRequestException("pair doesn't exit");
    }
  }
}
