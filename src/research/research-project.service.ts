import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResearchProject, ResearchProjectDocument } from './schemas/research-project.schema';
import { CreateResearchProjectDto } from './dto/create-research-project.dto';
import { UpdateResearchProjectDto } from './dto/update-research-project.dto';

@Injectable()
export class ResearchProjectService {
  constructor(
    @InjectModel(ResearchProject.name) private projectModel: Model<ResearchProjectDocument>,
  ) {}

  async create(dto: CreateResearchProjectDto): Promise<ResearchProject> {
    return this.projectModel.create(dto);
  }

  async findAll(): Promise<ResearchProject[]> {
    return this.projectModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<ResearchProject> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, dto: UpdateResearchProjectDto): Promise<ResearchProject> {
    const project = await this.projectModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async delete(id: string): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Project not found');
  }
}
