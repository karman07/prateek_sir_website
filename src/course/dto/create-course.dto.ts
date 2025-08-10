import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsString()
  instructor: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsString()
  lessons: string;

  @IsOptional()
  @IsString()
  badge?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsNumber()
  priority?: number; // optional priority
}
