import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(dto: CreateBookDto): Promise<Book> {
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

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    const updated = await this.bookModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Book not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.bookModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Book not found');
    return { message: 'Book deleted successfully' };
  }
}
