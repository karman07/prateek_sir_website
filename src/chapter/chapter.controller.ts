import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RolesAllowed } from 'src/auth/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('chapters')
export class ChapterController {
  constructor(private readonly service: ChapterService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/chapters',
        filename: (_, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (_, file, cb) => {
        const allowedTypes = ['.pdf', '.ppt', '.pptx'];
        const ext = extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only PDF or PPT allowed'), false);
        }
      },
    }),
  )
  async upload(
    @Body() dto: CreateChapterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const fileUrl = `${process.env.BASE_URL}/uploads/chapters/${file.filename}`;
    return this.service.create(dto, fileUrl);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
