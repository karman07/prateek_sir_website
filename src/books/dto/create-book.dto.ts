import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tableOfContents?: string[];

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  priority?: number; // Optional priority in DTO
}
