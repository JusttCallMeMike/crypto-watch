import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Pair } from './pair.schema'
import { Field, ID, ObjectType } from '@nestjs/graphql'

export type CandleDocument = Candle & Document

@ObjectType({ description: 'candle' })
@Schema({ timestamps: true })
export class Candle extends Document {
  @Field((_type) => ID)
  _id?: string

  @Field((_type) => Pair)
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Pair', required: true })
  pair!: Types.ObjectId

  @Field()
  @ApiProperty()
  @Prop()
  open: number
  @Field()
  @ApiProperty()
  @Prop()
  close: number
  @Field()
  @ApiProperty()
  @Prop()
  high: number
  @Field()
  @ApiProperty()
  @Prop()
  low: number

  @Field()
  @ApiProperty()
  @Prop()
  interval: number

  @Field()
  @Prop({ default: Date.now })
  createdAt!: Date
  @Field()
  @Prop({ default: Date.now })
  updatedAt!: Date
}

export const CandleSchema = SchemaFactory.createForClass(Candle)
