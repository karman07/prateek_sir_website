import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublicationDocument = Publication & Document;

@Schema({ timestamps: true })
export class Publication {
  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  authors: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  journal: string;

  @Prop()
  volume?: string;

  @Prop()
  issue?: string;

  @Prop()
  pages?: string;

  @Prop()
  file?: string; // uploaded file path if needed
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
