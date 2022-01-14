import {Injectable} from '@nestjs/common';

import {PrismaService} from 'src/db/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}
}
