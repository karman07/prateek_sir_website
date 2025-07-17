import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResearchProjectDto } from './dto/create-research-project.dto';
import { ResearchProjectService } from './research-project.service';
import { UpdateResearchProjectDto } from './dto/update-research-project.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolesAllowed } from '../auth/roles.enum';

@Controller('research-projects')
export class ResearchProjectController {
  constructor(private readonly projectService: ResearchProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @Post()
  @UseInterceptors(FileInterceptor('file')) // even if you're not uploading any files
  create(@Body() dto: CreateResearchProjectDto) {
    return this.projectService.create(dto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateResearchProjectDto) {
    return this.projectService.update(id, dto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
