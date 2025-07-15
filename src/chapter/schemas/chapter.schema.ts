import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Chapter extends Document {
  @Prop({ required: true }) chapter: string;
  @Prop({ required: true }) book: string;
  @Prop({ required: true }) type: string; 
  @Prop({ required: true }) file: string;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
