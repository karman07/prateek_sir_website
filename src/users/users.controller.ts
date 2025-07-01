import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolesAllowed } from '../auth/roles.enum';

@Controller('users')
@UseGuards(AuthGuard, RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user (only by admin/superadmin)
  @Post()
  @RolesAllowed('admin', 'superadmin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Get all users (only by admin/superadmin)
  @Get()
  @RolesAllowed('admin', 'superadmin')
  findAll() {
    return this.usersService.findAll();
  }

  // Get a user by ID (only by admin/superadmin)
  @Get(':id')
  @RolesAllowed('admin', 'superadmin')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Update a user by ID (only by admin/superadmin)
  @Patch(':id')
  @RolesAllowed('admin', 'superadmin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Delete a user by ID (only by admin/superadmin)
  @Delete(':id')
  @RolesAllowed('admin', 'superadmin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
