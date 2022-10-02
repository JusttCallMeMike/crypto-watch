import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { Candle } from './candle.schema'

export type PairDocument = Pair & Document

@ObjectType({ description: 'pair' })
@InputType('pairInput')
@Schema()
export class Pair {
  @Field((_type) => ID, { nullable: true })
  _id?: string

  @Field((_type) => String)
  @ApiProperty()
  @Prop({ unique: true })
  name: string
}

export const PairSchema = SchemaFactory.createForClass(Pair)
PairSchema.virtual('ticks', {
  ref: 'SubTaskEntity',
  localField: '_id',
  foreignField: 'pair',
})
export const CandleSchema = SchemaFactory.createForClass(Candle)
PairSchema.virtual('candle', {
  ref: 'SubTaskEntity',
  localField: '_id',
  foreignField: 'candle',
})
