import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Journal, JournalSchema } from './journal.schema';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Journal.name, schema: JournalSchema }]),AuthModule],
  controllers: [JournalsController],
  providers: [JournalsService],
})
export class JournalsModule {}
