import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication, PublicationDocument } from './schemas/publication.schema';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel(Publication.name) private publicationModel: Model<PublicationDocument>,
  ) {}

  async create(createDto: CreatePublicationDto, file?: Express.Multer.File): Promise<Publication> {
    const created = new this.publicationModel({
      ...createDto,
      file: file ? file.path : undefined,
    });
    return created.save();
  }

  async findAll(): Promise<Publication[]> {
    return this.publicationModel.find().sort({ year: -1 }).exec();
  }

  async findOne(id: string): Promise<Publication> {
    const pub = await this.publicationModel.findById(id).exec();
    if (!pub) throw new NotFoundException(`Publication not found`);
    return pub;
  }

  async update(id: string, updateDto: UpdatePublicationDto, file?: Express.Multer.File): Promise<Publication> {
    const updated = await this.publicationModel.findByIdAndUpdate(
      id,
      {
        ...updateDto,
        ...(file && { file: file.path }),
      },
      { new: true },
    );
    if (!updated) throw new NotFoundException(`Publication not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.publicationModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Publication not found`);
  }
}
