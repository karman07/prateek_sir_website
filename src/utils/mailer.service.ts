import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAIL_HOST'),
      port: configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASS'),
      },
    });
  }

  async sendVerificationEmail(to: string, token: string) {
    const url = `http://localhost:3000/auth/verify?token=${token}`;
    await this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM'),
      to,
      subject: 'Verify Your Email',
      html: `<p>Click here to verify your email: <a href="${url}">${url}</a></p>`,
    });
  }

  async sendForgotPasswordEmail(to: string, token: string) {
    const url = `http://localhost:3000/auth/reset-password?token=${token}`;
    await this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM'),
      to,
      subject: 'Reset Your Password',
      html: `<p>Click here to reset your password: <a href="${url}">${url}</a></p>`,
    });
  }
}
