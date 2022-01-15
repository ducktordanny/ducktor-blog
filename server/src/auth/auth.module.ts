import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';

import {DbModule} from 'src/db/db.module';

import {JwtStrategy} from './strategies/jwt.strategy';
import {LocalStrategy} from './strategies/local.strategy';
import {AuthService} from './auth.service';

@Module({
  imports: [
    DbModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {expiresIn: '60s'},
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
