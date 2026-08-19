import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  password?: string;

  @Prop({ default: '' })
  picture: string;

  @Prop({ default: null })
  googleId?: string;

  @Prop({ default: 'local' })
  provider: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: '' })
  walletAddress?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
