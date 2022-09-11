import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PairDocument = Pair & Document;

@Schema()
export class Pair {
  // @ApiProperty()
  _id?: string;

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
