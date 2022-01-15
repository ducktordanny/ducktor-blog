import {Controller, Get, Param} from '@nestjs/common';

import {UserService} from 'src/db/user/user.service';

@Controller('check')
export class CheckController {
  constructor(private userService: UserService) {}

  @Get('username/:username')
  async checkUsernameExists(
    @Param() {username}: {username: string},
  ): Promise<boolean> {
    return await this.userService.checkUsernameExists(username);
  }

  @Get('email/:email')
  async checkEmailExists(@Param() {email}: {email: string}): Promise<boolean> {
    return await this.userService.checkEmailExists(email);
  }
}
