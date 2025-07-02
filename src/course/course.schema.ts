import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  instructor: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  lessons: number;

  @Prop()
  badge?: string;

}

export const CourseSchema = SchemaFactory.createForClass(Course);
