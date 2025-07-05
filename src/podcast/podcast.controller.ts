import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards
} from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolesAllowed } from '../auth/roles.enum';

@Controller('podcasts')

export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  create(@Body() dto: CreatePodcastDto) {
    return this.podcastService.create(dto);
  }

  @Get()
  findAll() {
    return this.podcastService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podcastService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  update(@Param('id') id: string, @Body() dto: UpdatePodcastDto) {
    return this.podcastService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  remove(@Param('id') id: string) {
    return this.podcastService.remove(id);
  }
}
