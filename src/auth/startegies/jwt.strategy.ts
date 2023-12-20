import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret, // Replace with your own secret key
    });
  }

  async validate(payload: any): Promise<User> {
    const existingUser = await this.authService.validateUser(payload.username);

    if (!existingUser && existingUser.role != 'admin') {
      throw new UnauthorizedException('User doesnt exist in database admin');
    }

    return existingUser;
  }
}
