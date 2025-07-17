import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { Testimonial } from './testimonial.schema';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectModel(Testimonial.name) private model: Model<Testimonial>,
  ) {}

  async create(dto: CreateTestimonialDto): Promise<Testimonial> {
    return this.model.create(dto);
  }

  async findAll(): Promise<Testimonial[]> {
    return this.model.find();
  }

  async findOne(id: string): Promise<Testimonial> {
    return this.model.findById(id);
  }

  async update(id: string, dto: Partial<CreateTestimonialDto>) {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
