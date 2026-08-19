import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SwapDocument = Swap & Document;

@Schema({ timestamps: true })
export class Swap {
  @Prop({ default: null })
  userId?: string;

  @Prop({ default: '' })
  userEmail?: string;

  @Prop({ required: true })
  coinSymbol: string;

  @Prop({ required: true })
  coinName: string;

  @Prop({ required: true })
  usdAmount: number;

  @Prop({ required: true })
  estimatedAmount: number;

  @Prop({ required: true })
  priceAtSwap: number;

  @Prop({ default: 'Completed' })
  status: string;
}

export const SwapSchema = SchemaFactory.createForClass(Swap);
