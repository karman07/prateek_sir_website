import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConferencesService } from './conferences.service';
import { ConferencesController } from './conferences.controller';
import { Conference, ConferenceSchema } from './schemas/conference.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conference.name, schema: ConferenceSchema }]),
  ],
  controllers: [ConferencesController],
  providers: [ConferencesService],
})
export class ConferencesModule {}
