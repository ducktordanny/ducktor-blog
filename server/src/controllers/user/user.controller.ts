import {Body, Controller, Get, Put, Request, UseGuards} from '@nestjs/common';

import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import {UserService} from 'src/db/user/user.service';
import {ProfileModel, RequestUser} from 'src/types';
import {
  EmailChangeValidator,
  PasswordChangeValidator,
} from 'src/validators/user.validator';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all-profile')
  public findAll(): Promise<ProfileModel[]> {
    return this.userService.getProfiles();
  }

  @Get('profile')
  public async findProfile(@Request() req: RequestUser): Promise<ProfileModel> {
    return this.userService.getAProfile(req.user.username);
  }

  @Put('password')
  public async changePassword(
    @Request() req: RequestUser,
    @Body() body: PasswordChangeValidator,
  ): Promise<string> {
    return this.userService.changePassword(
      req.user.username,
      body.oldPassword,
      body.newPassword,
    );
  }

  @Put('email')
  public async changeEmail(
    @Request() req: RequestUser,
    @Body() body: EmailChangeValidator,
  ): Promise<string> {
    return this.userService.changeEmail(
      req.user.username,
      body.password,
      body.newEmail,
    );
  }

  @Put('bio')
  public async changeBio(
    @Request() req: RequestUser,
    @Body() body: {newBio: string},
  ): Promise<string> {
    return this.userService.changeBio(req.user.username, body.newBio);
  }
}
