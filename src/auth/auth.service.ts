import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    console.log('username $$$ ', user);

    this.logger.debug(
      ` Value checkd in database if user exists   "${JSON.stringify(user)}" `,
    );

    if (user) {
      return { status: 1, message: 'user already exists' };
    } else {
      return { status: 0, message: 'New User' };
    }
  }

  async login(user: any) {
    const existingUser = await this.validateUser(user.username);
    this.logger.verbose(
      `User status in database    "${JSON.stringify(existingUser)}" `,
    );
    if (existingUser.status == 0) {
      throw new UnauthorizedException(
        'User does not exist in database, please provide Valid user ',
      );
    }

    const payload = { username: user.username, sub: user.password };
    const loginCredentials = {
      access_token: this.jwtService.sign(payload),
    };

    this.logger.debug(
      `Succesfully generated token on server   "${JSON.stringify(
        loginCredentials,
      )}" `,
    );

    return loginCredentials;
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.validateUser(createUserDto.username);
    if (existingUser.status == 0) {
      return this.usersService.create(createUserDto);
    } else {
      return existingUser;
    }
  }
}
