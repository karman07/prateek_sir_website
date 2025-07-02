import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from './course.schema';
import { AuthModule } from '../auth/auth.module'; // 👈 import AuthModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    forwardRef(() => AuthModule), // 👈 so JwtService is available
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
