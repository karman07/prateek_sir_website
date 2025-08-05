import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PoemsService } from './poems.service';
import { PoemsController } from './poems.controller';
import { Poem, PoemSchema } from './schemas/poem.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Poem.name, schema: PoemSchema }])],
  controllers: [PoemsController],
  providers: [PoemsService],
})
export class PoemsModule {}
