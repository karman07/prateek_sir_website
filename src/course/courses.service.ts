import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(dto: CreateCourseDto): Promise<Course> {
    return await this.courseModel.create(dto);
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, dto: UpdateCourseDto): Promise<Course> {
    const updated = await this.courseModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Course not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.courseModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Course not found');
    return { message: 'Course deleted successfully' };
  }
}
