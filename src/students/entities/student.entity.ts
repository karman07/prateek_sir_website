import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  thesisTitle: string;

  @Prop({ required: true, enum: ['PhD', 'Masters'] })
  degree: 'PhD' | 'Masters';

  @Prop({ required: true })
  year: string;

  @Prop()
  image?: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
