import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @Type(() => Number)
  @IsNumber()
  year: number;

  @IsString()
  @IsNotEmpty()
  authors: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  publication: string;

  @IsString()
  @IsNotEmpty()
  monthYear: string;
}
