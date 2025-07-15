import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workshop } from './schemas/workshop.schema';
import { Model } from 'mongoose';
import { CreateWorkshopDto } from './dto/create-workshop.dto';

@Injectable()
export class WorkshopsService {
  constructor(@InjectModel(Workshop.name) private model: Model<Workshop>) {}

  create(dto: CreateWorkshopDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.find().sort({ year: -1 }).exec();
  }

  update(id: string, dto: CreateWorkshopDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
