import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminPosition, AdminPositionSchema } from './schemas/admin-position.schema';
import { AdminPositionsController } from './admin-positions.controller';
import { AdminPositionsService } from './admin-positions.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminPosition.name, schema: AdminPositionSchema },
    ]),
    AuthModule
  ],
  controllers: [AdminPositionsController],
  providers: [AdminPositionsService],
})
export class AdminPositionsModule {}
