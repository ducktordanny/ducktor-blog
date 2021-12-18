import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { DbModule } from 'src/db/db.module';
import { PostController } from './post/post.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [DbModule],
  controllers: [UserController, PostController],
})
export class ControllersModule {}
