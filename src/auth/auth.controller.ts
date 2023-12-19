import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req): Promise<any> {
    console.log(`user request login controller (req) " `);
    const user = { username: req.username, password: req.password };
    const token = await this.authService.login(user);
    return token;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    // const { username, password } = req.body;
    const user = await this.authService.register(createUserDto);
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
