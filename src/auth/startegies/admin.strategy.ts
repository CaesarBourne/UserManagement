import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validateUser(username: string) {
    const user = this.authService.validateUser(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validate(username: string) {
    const user = await this.authService.validateUser(username);
    if (!user && user.role != 'admin') {
      throw new UnauthorizedException();
    }
    return user;
  }
}
