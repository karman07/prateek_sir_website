import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PoemsService } from './poems.service';
import { CreatePoemDto } from './dto/create-poem.dto';
import { UpdatePoemDto } from './dto/update-poem.dto';
import { Poem } from './schemas/poem.schema';

@Controller('poems')
export class PoemsController {
  constructor(private readonly poemsService: PoemsService) {}

  @Post()
  create(@Body() createPoemDto: CreatePoemDto): Promise<Poem> {
    return this.poemsService.create(createPoemDto);
  }

  @Get()
  findAll(): Promise<Poem[]> {
    return this.poemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Poem> {
    return this.poemsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePoemDto: UpdatePoemDto): Promise<Poem> {
    return this.poemsService.update(id, updatePoemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.poemsService.remove(id);
  }
}
