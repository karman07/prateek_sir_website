import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResearchProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  fundingAgency: string;

  @IsString()
  @IsNotEmpty()
  scheme: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  investigators: string;

  @IsString()
  @IsNotEmpty()
  discription: string;

  @IsOptional()
  @IsString()
  link?: string;
}
