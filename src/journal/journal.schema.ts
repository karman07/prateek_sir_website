import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Journal extends Document {
  @Prop({ required: true }) authors: string;

  @Prop({ required: true }) title: string;

  @Prop({ required: true }) journal: string;

  @Prop({ required: true }) year: string;

  @Prop() volume?: string;

  @Prop() number?: string;

  @Prop({ required: true }) pages: string;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);
