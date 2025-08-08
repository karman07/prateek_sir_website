import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from './utils/mailer.service';
import { MailerModule } from './utils/mailer.module';
import { CoursesModule } from './course/courses.module';
import { BooksModule } from './books/books.module';
import { ResearchProjectModule } from './research/research-project.module';
import { PodcastModule } from './podcast/podcast.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { AdminPosition } from './admin-positions/schemas/admin-position.schema';
import { ChapterModule } from './chapter/chapter.module';
import { Journal } from './journal/journal.schema';
import { JournalsModule } from './journal/journals.module';
import { AdminPositionsModule } from './admin-positions/admin-positions.module';
import { StudentsModule } from './students/students.module';
import { TestimonialModule } from './testimonials/testimonial.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { ContactModule } from './contact/contact.module';
import { Poem } from './poems/schemas/poem.schema';
import { PoemsModule } from './poems/poems.module';
import { PublicationsModule } from './publication/publications.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || 'mongodb+srv://karmansingharora01:8813917626@cluster0.mbj5enl.mongodb.net/',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MailerModule,
    CoursesModule,
    BooksModule,
    ResearchProjectModule,
    PodcastModule,
    WorkshopsModule,
    AdminPositionsModule,
    ChapterModule,
    JournalsModule,
    StudentsModule,
    TestimonialModule,
    SubscribeModule,
    ContactModule,
    PoemsModule,
    PublicationsModule
  ]
})
export class AppModule {}
