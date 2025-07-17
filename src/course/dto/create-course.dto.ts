import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() instructor: string;
  @IsString() duration: string;
  @IsString() level: string;
  @IsString() lessons: string;
  @IsOptional() @IsString() badge?: string;
  @IsOptional() @IsString() link?: string;
}
