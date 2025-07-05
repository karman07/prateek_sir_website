import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already exists');

    const fbUser = await admin.auth().createUser({
      email: dto.email,
      password: dto.password,
      displayName: dto.name,
    });

    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role || 'user',
      verified: true, // ✅ assume verified since we're skipping email verification
      firebaseUid: fbUser.uid,
    });

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Registered successfully. Now you can Login',
      accessToken: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('No account with that email');

    const resetLink = await admin.auth().generatePasswordResetLink(email);
    return {
      message: 'Reset password link generated.',
      resetLink,
    };
  }

 async firebaseLogin(idToken: string) {
  // Verify Firebase ID token
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const fbUser = await admin.auth().getUser(decodedToken.uid);

  // Check if user exists in our DB
  let user = await this.usersService.findByEmail(fbUser.email);

  // If not, register them
  if (!user) {
    user = await this.usersService.create({
      name: fbUser.displayName || 'Google User',
      email: fbUser.email,
      password: '', // no password since it's Google login
      role: 'user',
      verified: true,
      firebaseUid: fbUser.uid,
    });
  }

  // Ensure user is marked as verified
  if (!user.verified) {
    user.verified = true;
    await user.save();
  }

  // Generate JWT token
  const payload = {
    sub: user._id.toString(),
    email: user.email,
    role: user.role,
  };
  const token = this.jwtService.sign(payload);

  return {
    accessToken: token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    },
    message: 'Google sign-in successful',
  };
}

  async resetPassword(token: string, newPassword: string) {
    return {
      message:
        'Reset password is handled via Firebase reset link. Use the link sent in forgot password.',
    };
  }

  async verifyEmail(token: string) {
    return {
      message:
        'Email verification is handled via Firebase. This route is disabled in current flow.',
    };
  }

  async firebaseUserInfo(uid: string) {
    return await admin.auth().getUser(uid);
  }

  async listAllFirebaseUsers() {
    const listUsersResult = await admin.auth().listUsers();
    return listUsersResult.users;
  }
}
