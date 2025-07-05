import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResearchProjectDocument = ResearchProject & Document;

@Schema({ timestamps: true })
export class ResearchProject {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  fundingAgency: string;

  @Prop({ required: true })
  scheme: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  investigators: string;

  @Prop({ required: true })
  discription: string;

  @Prop()
  link?: string;
}

export const ResearchProjectSchema = SchemaFactory.createForClass(ResearchProject);
