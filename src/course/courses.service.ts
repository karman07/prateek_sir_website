import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { deleteImageFile } from '../utils/file.util';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(dto: CreateCourseDto & { thumbnail: string }): Promise<Course> {
    return this.courseModel.create(dto);
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, dto: UpdateCourseDto, newThumbnail?: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) throw new NotFoundException('Course not found');

    if (newThumbnail && course.thumbnail) {
      deleteImageFile(course.thumbnail);
    }

    const updated = await this.courseModel.findByIdAndUpdate(
      id,
      { ...dto, ...(newThumbnail ? { thumbnail: newThumbnail } : {}) },
      { new: true },
    );
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const course = await this.courseModel.findById(id);
    if (!course) throw new NotFoundException('Course not found');

    if (course.thumbnail) {
      deleteImageFile(course.thumbnail);
    }

    await this.courseModel.findByIdAndDelete(id);
    return { message: 'Course deleted successfully' };
  }
}
