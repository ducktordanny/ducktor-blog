import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { unlink } from 'fs/promises';

import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  public async getAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  public async createNewPostByUpload(
    userId: number,
    title: string,
    markdownPath: string,
  ): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title,
        markdownPath: `post/${markdownPath}`,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  public async modifyPost(
    userId: number,
    postId: number,
    filename: string,
  ): Promise<Post> {
    const post = await this.prisma.post.findFirst({
      where: { userId, id: postId },
    });
    await unlink(`src/upload/${post.markdownPath}`);
    return await this.prisma.post.update({
      where: { id: postId },
      data: { markdownPath: `post/${filename}` },
    });
  }

  public async deletePostById(id: number) {
    const deletedPost = await this.prisma.post.delete({
      where: { id },
    });
    await unlink(`src/upload/${deletedPost.markdownPath}`);
  }
}
