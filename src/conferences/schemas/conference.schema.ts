import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConferenceDocument = Conference & Document;

@Schema({ timestamps: true })
export class Conference {
  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  authors: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  venue?: string;

  @Prop()
  location?: string;

  @Prop()
  details?: string;
}

export const ConferenceSchema = SchemaFactory.createForClass(Conference);
