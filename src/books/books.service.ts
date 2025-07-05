import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { deleteImageFile } from '../utils/file.util';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(dto: CreateBookDto & { image: string }): Promise<Book> {
    const book = new this.bookModel(dto);
    return book.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, dto: UpdateBookDto, newImagePath?: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book not found');

    // Delete old image if new one is provided
    if (newImagePath && book.image) {
      deleteImageFile(book.image);
    }

    const updated = await this.bookModel.findByIdAndUpdate(
      id,
      { ...dto, ...(newImagePath ? { image: newImagePath } : {}) },
      { new: true },
    );

    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException('Book not found');

    // Delete image file
    if (book.image) {
      deleteImageFile(book.image);
    }

    await this.bookModel.findByIdAndDelete(id);
    return { message: 'Book deleted successfully' };
  }
}
