import {
  Pair,
  PairService,
  ParsePairPipe,
  TickService,
} from '@crypto-watch/shared';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import axios from 'axios';
import { AppService } from './app.service';

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
  async createPair(@Body() pair: Pair) {
    this.appService.createPair(pair);
  }

  @Get('ticks/:pair')
  async ticks(@Param('pair', ParsePairPipe) pair: Pair) {
    return this.tickService.findAll(pair);
  }
}
