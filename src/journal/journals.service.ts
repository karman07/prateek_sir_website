import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Journal } from './journal.schema';
import { Model } from 'mongoose';
import { CreateJournalDto } from './create-journal.dto';

@Injectable()
export class JournalsService {
  constructor(@InjectModel(Journal.name) private model: Model<Journal>) {}

  create(dto: CreateJournalDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.find().sort({ year: -1 }).exec();
  }

  update(id: string, dto: CreateJournalDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
