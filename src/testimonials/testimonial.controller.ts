import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { TestimonialService } from './testimonial.service';

@Controller('testimonials')
export class TestimonialController {
  constructor(private readonly service: TestimonialService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/testimonials',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @Body() body: CreateTestimonialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      body.image = file.path;
    }
    return this.service.create(body);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/testimonials',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() body: CreateTestimonialDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      body.image = file.path;
    }
    return this.service.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
