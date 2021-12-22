import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './db/user/user.service';
import { ProfileModel } from './types';
import { SignUpValidator } from './validators/user.validator';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('test')
  public test(): { response: string } {
    return { response: 'Hello World' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  public async signupUser(
    @Body()
    body: SignUpValidator,
  ): Promise<ProfileModel> {
    const { username, email, password } = body;
    return await this.userService.createUser(
      {
        username,
        email,
        password,
      },
      body.bio,
    );
  }
}
