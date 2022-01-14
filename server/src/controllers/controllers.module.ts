import {Module} from '@nestjs/common';

import {DbModule} from 'src/db/db.module';

import {CheckController} from './check/check.controller';
import {PostController} from './post/post.controller';
import {UserController} from './user/user.controller';

@Module({
  imports: [DbModule],
  controllers: [UserController, PostController, CheckController],
})
export class ControllersModule {}
