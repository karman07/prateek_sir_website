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
  Patch,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AdminPositionsService } from './admin-positions.service';
import { CreateAdminPositionDto } from './dto/create-admin-position.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RolesAllowed } from 'src/auth/roles.enum';

@Controller('positions')
export class AdminPositionsController {
  constructor(private readonly service: AdminPositionsService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() dto: CreateAdminPositionDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() dto: CreateAdminPositionDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
