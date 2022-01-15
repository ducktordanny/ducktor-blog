import {Module} from '@nestjs/common';

import {CommentService} from './comment/comment.service';
import {PostService} from './post/post.service';
import {PrismaService} from './prisma/prisma.service';
import {ProfileService} from './profile/profile.service';
import {UserService} from './user/user.service';

@Module({
  providers: [
    PrismaService,
    UserService,
    ProfileService,
    PostService,
    CommentService,
  ],
  exports: [UserService, ProfileService, PostService, CommentService],
})
export class DbModule {}
