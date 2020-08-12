import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserTypeEnum } from '../../../users/shared/user.type.enum';
import { jwtConstants } from '../constants';
import { IJwtPayload } from '../ijwt-payload';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    if (payload.type != UserTypeEnum.admin) {
      throw new UnauthorizedException();
    } 
    
    return payload;
  }
}
