import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PoemDocument = Poem & Document;

@Schema({ timestamps: true })
export class Poem {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  youtubeLink: string;
}

export const PoemSchema = SchemaFactory.createForClass(Poem);
