import {Injectable} from '@nestjs/common';

import {PrismaService} from '@backend/db/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
}
