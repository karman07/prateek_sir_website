import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from './utils/mailer.service';
import { MailerModule } from './utils/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env variables available everywhere

    // Mongoose setup with dynamic config
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || 'mongodb+srv://karmansingharora01:8813917626@cluster0.mbj5enl.mongodb.net/',
      }),
      inject: [ConfigService],
    }),

    // Your feature modules
    AuthModule,
    UsersModule,
    MailerModule,
  ]
})
export class AppModule {}
