import {
  Pair,
  PairService,
  ParsePairPipe,
  Tick,
  TickService,
} from '@crypto-watch/db';
import { Logger, ParseIntPipe } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ObjectId } from 'mongoose';
import { take } from 'rxjs';
import { TickArgs } from './dto/tick.arguments';

const pubsub = new PubSub();

@Resolver((of) => Tick)
export class TickResolver {
  constructor(
    private readonly tickService: TickService,
    private readonly pairService: PairService
  ) {}
  private readonly logger = new Logger(TickResolver.name);

  //   @Query((returns) => [Tick])
  //   async ticks(@Args('pair', ParsePairPipe) pair: Pair): Promise<Tick[]> {
  //     const results = await this.tickService.findAll(pair);
  //     return results;
  //   }

  @Query((returns) => [Tick])
  async ticks(@Args() args: TickArgs): Promise<Tick[]> {
    // this.logger.debug(args.pair);
    const pair = await this.pairService.getByName(args.pair.name);
    const results = await this.tickService.findAll(pair, args.take);
    // this.logger.debug(results);
    return results;
  }
  // FIXME : shouldnt work like this!
  @ResolveField('pair')
  async pair(@Parent() tick: any) {
    this.logger.debug({ tick });
    return this.pairService.getOne({ _id: tick.pair });
  }
}
