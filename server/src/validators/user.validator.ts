import {IsEmail, Length, MaxLength} from 'class-validator';

export class SignUpValidator {
  @Length(3, 16) username: string;
  @IsEmail() email: string;
  @Length(8, 30) password: string;
  @MaxLength(100) bio?: string;
}

export class PasswordChangeValidator {
  oldPassword: string;
  @Length(8, 30) newPassword: string;
}

export class EmailChangeValidator {
  password: string;
  @IsEmail() newEmail: string;
}
