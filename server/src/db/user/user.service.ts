import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/db/prisma/prisma.service';
import { ProfileModel } from 'src/types';

const PROFILE_SELECT = {
  username: true,
  email: true,
  password: true,
  createdAt: true,
  profile: {
    select: { imagePath: true, bio: true },
  },
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async getAUser(username: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  public async getAProfile(username: string): Promise<ProfileModel> {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
      select: { ...PROFILE_SELECT, password: false },
    });
  }

  public async getProfiles(): Promise<ProfileModel[]> {
    return this.prisma.user.findMany({
      select: { ...PROFILE_SELECT, password: false },
    });
  }

  public async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public async verifyUser(username: string, password: string): Promise<void> {
    const { password: hashedPassword } = await this.prisma.user.findFirst({
      where: { username },
      select: { password: true },
    });
    const isPasswordValid = await this.verifyPassword(password, hashedPassword);
    if (!isPasswordValid) throw new BadRequestException('Invalid password');
  }

  public async createUser(
    data: Prisma.UserCreateInput,
    bio?: string,
  ): Promise<ProfileModel> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    return await this.prisma.user.create({
      data: {
        ...data,
        profile: { create: { bio: bio ?? '' } },
      },
      select: { ...PROFILE_SELECT, password: false },
    });
  }

  public async changePassword(
    username: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<string> {
    await this.verifyUser(username, oldPassword);
    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    await this.prisma.user.update({
      where: { username },
      data: { password: hashedNewPassword },
    });
    return 'Success';
  }

  public async changeEmail(
    username: string,
    password: string,
    newEmail: string,
  ): Promise<string> {
    await this.verifyUser(username, password);
    await this.prisma.user.update({
      where: { username },
      data: { email: newEmail },
    });
    return 'Success';
  }

  public async changeBio(username: string, newBio: string): Promise<string> {
    await this.prisma.user.update({
      where: { username },
      data: {
        profile: { update: { bio: newBio } },
      },
    });
    return 'Success';
  }

  public async removeUser(id: number) {
    await this.prisma.profile.delete({
      where: {
        userId: id,
      },
    });
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}