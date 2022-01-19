import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt} from 'passport-jwt';
import {Strategy} from 'passport-jwt';

import {Payload} from '@backend/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  public async validate(payload: Payload) {
    return {id: payload.sub, username: payload.username};
  }
}
