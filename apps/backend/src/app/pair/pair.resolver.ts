import {
  Pair,
  PairService,
  ParsePairPipe,
  Tick,
  TickService,
} from '@crypto-watch/shared';
import { Logger, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PairArgs } from './dto/pair.arguments';

const pubsub = new PubSub();

@Resolver((of) => Pair)
export class PairResolver {
  constructor(private readonly pairService: PairService) {}
  private readonly logger = new Logger(PairResolver.name);

  @Query((returns) => Pair)
  async pair(@Args() args: PairArgs): Promise<Pair> {
    const result = await this.pairService.getOne(args);
    if (!result) throw new NotFoundException(args);
    this.logger.debug(result);
    return result;
  }
  // @Query((returns) => Pair)
  // async pair_(@Args('name') name: string): Promise<Pair> {
  //   this.logger.debug(name);
  //   return await this.pairService.getByName(name);
  // }
}
