import { Pair, ParsePairPipe } from '@crypto-watch/shared';
import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { isObject, IsOptional } from 'class-validator';

@ArgsType()
export class PairArgs {
  @Field((type) => ID, { nullable: true })
  @IsOptional()
  _id;
  @IsOptional()
  @Field((Type) => String, { nullable: true })
  name;
}
