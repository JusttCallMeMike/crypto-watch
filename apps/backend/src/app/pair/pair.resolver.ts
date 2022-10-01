import {
  Pair,
  PairService,
  ParsePairPipe,
  Tick,
  TickService,
} from '@crypto-watch/db'
import { Logger, NotFoundException, ParseIntPipe } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import axios from 'axios'
import { PubSub } from 'graphql-subscriptions'
import { PairArgs, PairWithJustName } from './dto/pair.arguments'

const pubsub = new PubSub()

@Resolver((of) => Pair)
export class PairResolver {
  constructor(private readonly pairService: PairService) {}
  private readonly logger = new Logger(PairResolver.name)

  @Query((returns) => Pair)
  async pair(@Args() args: PairArgs): Promise<Pair> {
    const result = await this.pairService.getOne(args)
    if (!result) throw new NotFoundException(args)
    this.logger.debug(result)
    return result
  }
  @Query((returns) => [Pair])
  async pairs(): Promise<Pair[]> {
    return this.pairService.findAll()
  }
  @Mutation((returns) => Pair)
  async createPair(@Args() pair: PairWithJustName) {
    await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${pair.name}`
    )
    return this.pairService.create(pair)
  }
  // @Query((returns) => Pair)
  // async pair_(@Args('name') name: string): Promise<Pair> {
  //   this.logger.debug(name);
  //   return await this.pairService.getByName(name);
  // }
}
