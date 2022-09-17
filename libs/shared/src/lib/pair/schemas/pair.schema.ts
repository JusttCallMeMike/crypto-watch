import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

export type PairDocument = Pair & Document;

@ObjectType({ description: 'pair' })
@InputType('pairInput')
@Schema()
export class Pair {
  @Field((type) => ID, { nullable: true })
  _id?: string;

  @Field((type) => String)
  @ApiProperty()
  @Prop({ unique: true })
  name: string;
}

export const PairSchema = SchemaFactory.createForClass(Pair);
PairSchema.virtual('ticks', {
  ref: 'SubTaskEntity',
  localField: '_id',
  foreignField: 'pair',
});
