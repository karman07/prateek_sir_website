import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) 
  async subscribe(@Body() body: CreateSubscriptionDto) {
    return this.subscribeService.create(body);
  }

  @Get()
  async getAll() {
    return this.subscribeService.findAll();
  }
}
