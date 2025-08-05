import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poem, PoemDocument } from './schemas/poem.schema';
import { Model } from 'mongoose';
import { CreatePoemDto } from './dto/create-poem.dto';
import { UpdatePoemDto } from './dto/update-poem.dto';

@Injectable()
export class PoemsService {
  constructor(@InjectModel(Poem.name) private poemModel: Model<PoemDocument>) {}

  async create(createPoemDto: CreatePoemDto): Promise<Poem> {
    const poem = new this.poemModel(createPoemDto);
    return poem.save();
  }

  async findAll(): Promise<Poem[]> {
    return this.poemModel.find().exec();
  }

  async findOne(id: string): Promise<Poem> {
    const poem = await this.poemModel.findById(id).exec();
    if (!poem) throw new NotFoundException('Poem not found');
    return poem;
  }

  async update(id: string, updatePoemDto: UpdatePoemDto): Promise<Poem> {
    const poem = await this.poemModel.findByIdAndUpdate(id, updatePoemDto, { new: true });
    if (!poem) throw new NotFoundException('Poem not found');
    return poem;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.poemModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Poem not found');
    return { message: 'Poem deleted successfully' };
  }
}
