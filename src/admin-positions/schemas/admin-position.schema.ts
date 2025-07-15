import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AdminPosition {
  @Prop({ required: true })
  description: string;
}

export type AdminPositionDocument = AdminPosition & Document;
export const AdminPositionSchema = SchemaFactory.createForClass(AdminPosition);
