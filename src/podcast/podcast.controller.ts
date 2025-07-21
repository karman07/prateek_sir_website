import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolesAllowed } from '../auth/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('podcasts')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/podcasts',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `podcast-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreatePodcastDto,
  ) {
    const payload = { ...dto, fileUrl: file?.path || '' };
    return this.podcastService.create(payload);
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/podcasts',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `podcast-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdatePodcastDto,
  ) {
    const payload = {
      ...dto,
      ...(file && { fileUrl: file.path }),
    };
    return this.podcastService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  remove(@Param('id') id: string) {
    return this.podcastService.remove(id);
  }
}
