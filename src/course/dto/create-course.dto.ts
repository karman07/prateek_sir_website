import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsString() thumbnail: string;
  @IsString() instructor: string;
  @IsString() duration: string;
  @IsString() level: string;
  @IsNumber() lessons: number;
  @IsOptional() @IsString() badge?: string;
}
