import { Pair, ParsePairPipe } from '@crypto-watch/shared';
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class TickArgs {
  @Field((type) => Pair)
  pair;
  @Field((Type) => Int)
  take = 30;
}
