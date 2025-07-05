import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PodcastDocument = Podcast & Document;

@Schema({ timestamps: true })
export class Podcast {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  place: string;

  @Prop({ required: true })
  date: string;
}

export const PodcastSchema = SchemaFactory.createForClass(Podcast);
