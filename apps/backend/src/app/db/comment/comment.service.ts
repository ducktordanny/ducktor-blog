import {Injectable} from '@nestjs/common';

import {PrismaService} from '@backend/db/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}
}
