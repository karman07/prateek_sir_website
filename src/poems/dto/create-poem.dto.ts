import { IsNotEmpty } from 'class-validator';

export class CreatePoemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  youtubeLink: string;
}
