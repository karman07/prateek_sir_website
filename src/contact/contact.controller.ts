import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/contacts',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createContact(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const { name, email, phone, message } = body;

    return this.contactService.create({
      name,
      email,
      phone,
      message,
      fileUrl: file ? `/uploads/contacts/${file.filename}` : null,
    });
  }

  @Get()
  async getAllContacts() {
    return this.contactService.findAll();
  }
}
