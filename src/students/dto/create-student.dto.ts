import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  thesisTitle: string;

  @IsEnum(['PhD', 'Masters'])
  degree: 'PhD' | 'Masters';

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsOptional()
  image?: string;
}
