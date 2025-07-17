import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscribe, SubscribeDocument } from './schema/subscribe.schema';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectModel(Subscribe.name) private subscribeModel: Model<SubscribeDocument>,
  ) {}

  async create(dto: CreateSubscriptionDto) {
    const exists = await this.subscribeModel.findOne({ email: dto.email });
    if (exists) {
      throw new BadRequestException('Email already subscribed.');
    }

    const subscription = new this.subscribeModel(dto);
    return subscription.save();
  }

  async findAll() {
    return this.subscribeModel.find().sort({ createdAt: -1 });
  }
}
