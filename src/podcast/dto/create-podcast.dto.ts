import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePodcastDto {
  @IsNotEmpty()
  @IsString()
  topic: string;

  @IsNotEmpty()
  @IsString()
  place: string;

  @IsNotEmpty()
  @IsString()
  date: string;
}
