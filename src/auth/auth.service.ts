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
import { UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if user already exists in MongoDB
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already exists');

    // Create user in Firebase
    const fbUser = await admin.auth().createUser({
      email: dto.email,
      password: dto.password,
      displayName: dto.name,
    });

    // Send Firebase email verification
    const verifyLink = await admin.auth().generateEmailVerificationLink(dto.email);
    console.log('🔗 Email verification link:', verifyLink);

    // Create user in MongoDB
    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role || 'user',
      verified: false,
      firebaseUid:fbUser.uid
    });

    return {
      message: 'Registered successfully. Please verify your email.',
      firebaseUID: fbUser.uid,
      emailVerificationLink: verifyLink,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const fbUser = await admin.auth().getUserByEmail(dto.email);
    if (!fbUser.emailVerified) {
      const verifyLink = await admin.auth().generateEmailVerificationLink(dto.email);
      throw new UnauthorizedException(
        `Email not verified. New verification link sent.\nLink: ${verifyLink}`,
      );
    }

    if (!user.verified) {
      user.verified = true;
      await user.save();
    }

    const payload = { sub: user._id.toString(), email: user.email, role: user.role };
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

  async resetPassword(token: string, newPassword: string) {
    return {
      message:
        'Reset password is handled via Firebase reset link. Use the link sent in forgot password.',
    };
  }

  async verifyEmail(token: string) {
    return {
      message:
        'Email verification is handled via Firebase. Use the link sent to your email.',
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
