import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop()
  image: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
