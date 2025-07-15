import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminPosition, AdminPositionDocument } from './schemas/admin-position.schema';
import { CreateAdminPositionDto } from './dto/create-admin-position.dto';

@Injectable()
export class AdminPositionsService {
  constructor(
    @InjectModel(AdminPosition.name) private model: Model<AdminPositionDocument>
  ) {}

  create(dto: CreateAdminPositionDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.find().exec();
  }

  update(id: string, dto: CreateAdminPositionDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
