import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Testimonial extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  quote: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
