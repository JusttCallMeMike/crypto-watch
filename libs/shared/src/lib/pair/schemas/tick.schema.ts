import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Pair } from './pair.schema';

// TODO: do I need this?
export type TickDocument = Tick & Document;

// TODO: should I extend document ?
@Schema({ timestamps: true })
export class Tick extends Document {
  _id?: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Pair', required: true })
  pair!: Types.ObjectId;

  @ApiProperty()
  @Prop()
  price: number;

  // TODO: guess this is defoult, but added as a prop
  // can be used in swager and is a bit more verbose?
  @Prop({ default: Date.now }) createdAt!: Date;
  @Prop({ default: Date.now }) updatedAt!: Date;
}

export const TickSchema = SchemaFactory.createForClass(Tick);
