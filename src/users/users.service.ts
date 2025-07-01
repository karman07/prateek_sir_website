import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // Create a new user
  async create(dto: CreateUserDto): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = new this.userModel({ ...dto, password: hashedPassword });
    return newUser.save();
  }

  // Get all users (excluding password)
  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password');
  }

  // Get a single user by ID
  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Update a user by ID
  async update(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password');

    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  // Delete a user by ID
  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }

  // Used in auth module
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).select('-password');
  }
}
