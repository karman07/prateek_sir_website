import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAdminPositionDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
