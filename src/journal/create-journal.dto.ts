import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJournalDto {
  @IsNotEmpty()
  @IsString()
  authors: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  journal: string;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsOptional()
  @IsString()
  volume?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsNotEmpty()
  @IsString()
  pages: string;
}
