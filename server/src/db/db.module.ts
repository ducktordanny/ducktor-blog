import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { CommentService } from './comment/comment.service';
import { PostService } from './post/post.service';
import { ProfileService } from './profile/profile.service';

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
