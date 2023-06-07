import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException } from '@nestjs/common/exceptions';

import { AuthService } from '../../auth.service';

export const ACCESS_TOKEN_USER = 'access_token_user';

@Injectable()
export class AccessTokenUserStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_USER,
) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    const jwtConfig = configService.getOrThrow('jwt');
    super({
      jwtFromRequest: (req: Request) => req.headers[ACCESS_TOKEN_USER],
      ignoreExpiration: false,
      secretOrKey: jwtConfig.accessTokenSecret,
    });
  }

  async validate(payload: { sub: string }) {
    const user = await this.authService.validateUserById(payload.sub);
    if (!user.status) {
      throw new BadRequestException('You have been blocked by someone');
    }
    return user;
  }
}
