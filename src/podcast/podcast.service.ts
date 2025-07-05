import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Podcast, PodcastDocument } from './schemas/podcast.schema';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';

@Injectable()
export class PodcastService {
  constructor(@InjectModel(Podcast.name) private podcastModel: Model<PodcastDocument>) {}

  create(dto: CreatePodcastDto) {
    return this.podcastModel.create(dto);
  }

  findAll() {
    return this.podcastModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const podcast = await this.podcastModel.findById(id);
    if (!podcast) throw new NotFoundException('Podcast not found');
    return podcast;
  }

  async update(id: string, dto: UpdatePodcastDto) {
    const updated = await this.podcastModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Podcast not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.podcastModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Podcast not found');
    return { message: 'Podcast deleted successfully' };
  }
}
