import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from 'src/auth/roles.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) password: string;
  @Prop({ unique: true, required: true }) email: string;
  @Prop({ required: true }) firebaseUid: string;
  @Prop({ default: false }) verified: boolean;
  @Prop({ default: Roles.User, enum: Roles }) role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
