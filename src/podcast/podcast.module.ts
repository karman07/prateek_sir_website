import { Module } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { PodcastController } from './podcast.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Podcast, PodcastSchema } from './schemas/podcast.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Podcast.name, schema: PodcastSchema }]),
    AuthModule
  ],
  controllers: [PodcastController],
  providers: [PodcastService],
})
export class PodcastModule {}
