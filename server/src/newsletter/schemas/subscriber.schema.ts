import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriberDocument = Subscriber & Document;

@Schema({ timestamps: true })
export class Subscriber {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ default: Date.now })
  subscribedAt: Date;

  @Prop({ default: true })
  confirmationEmailSent: boolean;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
