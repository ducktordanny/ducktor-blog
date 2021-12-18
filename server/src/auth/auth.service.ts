import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/db/user/user.service';
import { TokenResponse, UserResponse } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponse> {
    const user = await this.userService.getAUser(username);

    if (user) {
      const { password: hashedPassword, ...result } = user;
      const isPasswordValid = await this.userService.verifyPassword(
        password,
        hashedPassword,
      );
      return isPasswordValid ? result : null;
    }
    return null;
  }

  public async login(user: UserResponse): Promise<TokenResponse> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
