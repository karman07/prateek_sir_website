import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchProjectService } from './research-project.service';
import { ResearchProjectController } from './research-project.controller';
import { ResearchProject, ResearchProjectSchema } from './schemas/research-project.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ResearchProject.name, schema: ResearchProjectSchema }]),
    AuthModule, 
  ],
  controllers: [ResearchProjectController],
  providers: [ResearchProjectService],
})
export class ResearchProjectModule {}
