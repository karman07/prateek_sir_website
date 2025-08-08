import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  authors: string; // comma-separated list or a single string

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  publication: string;

  @Prop({ required: true })
  monthYear: string; // e.g., March 2021
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
