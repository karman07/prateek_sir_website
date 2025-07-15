import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { JournalsService } from './journals.service';
import { CreateJournalDto } from './create-journal.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RolesAllowed } from 'src/auth/roles.enum';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('journals')
export class JournalsController {
  constructor(private readonly service: JournalsService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() dto: CreateJournalDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() dto: CreateJournalDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
