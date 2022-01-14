import {
  Controller,
  Delete,
  Get,
  Param,
  Post as PostRequest,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';

import {Post} from '@prisma/client';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import {PostService} from 'src/db/post/post.service';
import {RequestUser} from 'src/types';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('all')
  public async getAllPosts(): Promise<Post[]> {
    return await this.postService.getAllPosts();
  }

  @PostRequest('upload/:title')
  @UseInterceptors(FileInterceptor('file', {dest: 'src/upload/post'}))
  public async uploadFile(
    @Request() req: RequestUser,
    @Param() {title}: {title: string},
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Post> {
    return await this.postService.createNewPostByUpload(
      req.user.id,
      title,
      file.filename,
    );
  }

  @Put('modify/:id')
  @UseInterceptors(FileInterceptor('file', {dest: 'src/upload/post'}))
  public async modifyPostById(
    @Request() req: RequestUser,
    @Param() {id}: {id: number},
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Post> {
    return this.postService.modifyPost(req.user.id, id, file.filename);
  }

  @Delete('delete/:id')
  public async deletePostById(@Param() {id}: {id: number}): Promise<void> {
    await this.postService.deletePostById(+id);
  }
}
