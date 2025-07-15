import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter } from './schemas/chapter.schema';
import { Model } from 'mongoose';
import { CreateChapterDto } from './dto/create-chapter.dto';

@Injectable()
export class ChapterService {
  constructor(@InjectModel(Chapter.name) private model: Model<Chapter>) {}

  create(dto: CreateChapterDto, fileUrl: string) {
    return this.model.create({ ...dto, file:fileUrl });
  }

  findAll() {
    return this.model.find().sort({ chapter: 1 }).exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
