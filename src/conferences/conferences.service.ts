import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conference, ConferenceDocument } from './schemas/conference.schema';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';

@Injectable()
export class ConferencesService {
  constructor(
    @InjectModel(Conference.name) private confModel: Model<ConferenceDocument>,
  ) {}

  async create(dto: CreateConferenceDto): Promise<Conference> {
    const created = new this.confModel(dto);
    return created.save();
  }

  async findAll(filter?: { year?: number }): Promise<Conference[]> {
    const q: any = {};
    if (filter?.year) q.year = filter.year;
    return this.confModel.find(q).sort({ year: -1 }).exec();
  }

  async findOne(id: string): Promise<Conference> {
    const found = await this.confModel.findById(id).exec();
    if (!found) throw new NotFoundException('Conference not found');
    return found;
  }

  async update(id: string, dto: UpdateConferenceDto): Promise<Conference> {
    const updated = await this.confModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Conference not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const res = await this.confModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Conference not found');
  }
}
