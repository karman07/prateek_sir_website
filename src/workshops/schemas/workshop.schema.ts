import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Workshop extends Document {
  @Prop({ required: true })
  year: number;

  @Prop({ type: [String], required: true })
  events: string[];
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);
