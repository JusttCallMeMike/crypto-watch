import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Pair } from './pair.schema';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

// TODO: do I need this?
export type TickDocument = Tick & Document;

// TODO: should I extend document ?
@ObjectType({ description: 'tick' })
@Schema({ timestamps: true })
export class Tick extends Document {
  @Field((type) => ID)
  _id?: string;

  @Field((type) => Pair)
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Pair', required: true })
  pair!: Types.ObjectId;

  @Field()
  @ApiProperty()
  @Prop()
  price: number;

  // TODO: guess this is defoult, but added as a prop
  // can be used in swager and is a bit more verbose?
  @Field()
  @Prop({ default: Date.now })
  createdAt!: Date;
  @Field()
  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const TickSchema = SchemaFactory.createForClass(Tick);
