import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UploadedFiles,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RolesAllowed } from 'src/auth/roles.enum';

const storage = diskStorage({
  destination: './uploads/students',
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    @Body() body: CreateStudentDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /jpeg|png|jpg/ })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    const dto = { ...body };
    if (file) dto.image = file.filename;
    return this.studentService.create(dto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async update(
    @Param('id') id: string,
    @Body() body: UpdateStudentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const dto = { ...body };
    if (file) dto.image = file.filename;
    return this.studentService.update(id, dto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin', 'superadmin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
