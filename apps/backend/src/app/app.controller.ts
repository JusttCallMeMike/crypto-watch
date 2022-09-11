import {
  Pair,
  PairService,
  ParsePairPipe,
  TickService,
} from '@crypto-watch/shared';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pairService: PairService,
    private readonly tickService: TickService
  ) {}
  private readonly logger = new Logger(AppService.name);

  // FIXME: can I skip async like that ?  ... i guess
  @Get('pair')
  getData() {
    return this.pairService.findAll();
  }
  @Post('pair')
  async createPair(@Body() pair: Pair, @Res() response: Response) {
    try {
      this.logger.debug(`getting data for ${pair.name}`);

      await axios.get(
        `https://api.binance.com/api/v3/ticker/price?symbol=${pair.name}`
      );
      return await this.pairService.create(pair);
    } catch (error) {
      this.logger.error(error);
      // FIXME: should handle duplicate error
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(`Symbol doesn't exist`);
    }
  }
  @Get('ticks/:pair')
  async ticks(@Param('pair', ParsePairPipe) pair: Pair) {
    return this.tickService.findAll(pair);
  }
}
