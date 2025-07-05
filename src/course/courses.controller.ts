import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolesAllowed } from '../auth/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../utils/multer-options.util';
import { Express } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateCourseDto,
  ) {
    const imagePath = file ? process.env.BASE_URL + '/uploads/' + file.filename : '';
    return this.coursesService.create({ ...dto, thumbnail: imagePath });
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateCourseDto,
  ) {
    const imagePath = file ? process.env.BASE_URL + '/uploads/' + file.filename : null;
    return this.coursesService.update(id, dto, imagePath);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
