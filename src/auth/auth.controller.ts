import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req): Promise<any> {
    const user = req.username;
    const token = await this.authService.login(user);
    return token;
  }

  @Post('register')
  async register(@Request() req): Promise<any> {
    const { username, password } = req.body;
    // const user = await this.authService.register(username, password);
    // return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
