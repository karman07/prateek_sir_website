import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { RolesAllowed } from './roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('verify')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  resetPassword(
    @Query('token') token: string,
    @Body('password') password: string,
  ) {
    return this.authService.resetPassword(token, password);
  }

  @Post('firebase-login')
  firebaseLogin(@Body('idToken') idToken: string) {
    return this.authService.firebaseLogin(idToken);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: any) {
    return req.user;
  }

  @Get('admin-area')
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAllowed('admin')
  adminArea() {
    return { msg: 'Admin access granted' };
  }
}
