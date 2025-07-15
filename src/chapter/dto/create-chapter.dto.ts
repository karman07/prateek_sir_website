import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChapterDto {
  @IsNotEmpty()
  @IsString()
  chapter: string;

  @IsNotEmpty()
  @IsString()
  book: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
