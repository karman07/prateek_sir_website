import { IsNotEmpty, IsNumber, IsArray, IsString, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorkshopDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number) 
  readonly year: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  readonly events: string[];
}
