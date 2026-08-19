import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() body: { name: string; email: string; password?: string },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password?: string }) {
    return this.authService.login(body);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport redirects to Google login page
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    try {
      let clientUrl = process.env.CLIENT_URL;
      const host = req.headers.host || '';
      if (host.includes('railway.app') || process.env.NODE_ENV === 'production' || !clientUrl || clientUrl.includes('localhost')) {
        clientUrl = 'https://cryptoapp-two-henna.vercel.app';
      }

      const userResult = await this.authService.validateOAuthUser(req.user);
      const { token, user } = userResult;

      const redirectUrl = `${clientUrl}/auth-callback?token=${encodeURIComponent(
        token,
      )}&id=${encodeURIComponent(user._id.toString())}&email=${encodeURIComponent(
        user.email,
      )}&name=${encodeURIComponent(user.name)}&picture=${encodeURIComponent(
        user.picture || '',
      )}`;

      return res.redirect(redirectUrl);
    } catch (error) {
      let clientUrl = process.env.CLIENT_URL;
      const host = req.headers.host || '';
      if (host.includes('railway.app') || process.env.NODE_ENV === 'production' || !clientUrl || clientUrl.includes('localhost')) {
        clientUrl = 'https://cryptoapp-two-henna.vercel.app';
      }

      return res.redirect(
        `${clientUrl}/login?error=${encodeURIComponent(
          'Failed to authenticate with Google',
        )}`,
      );
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: any) {
    return {
      success: true,
      user: req.user,
    };
  }

  @Post('wallet')
  @UseGuards(AuthGuard('jwt'))
  async updateWallet(
    @Req() req: any,
    @Body('walletAddress') walletAddress: string,
  ) {
    const updated = await this.usersService.updateWallet(
      req.user._id.toString(),
      walletAddress,
    );
    return {
      success: true,
      user: updated,
    };
  }

  @Post('picture')
  @UseGuards(AuthGuard('jwt'))
  async updatePicture(
    @Req() req: any,
    @Body('picture') picture: string,
  ) {
    const updated = await this.usersService.updatePicture(
      req.user._id.toString(),
      picture,
    );
    return {
      success: true,
      user: updated,
    };
  }

  @Get('status')
  getStatus() {
    return {
      status: 'online',
      service: 'Circlechain Auth & Newsletter API',
      timestamp: new Date().toISOString(),
    };
  }
}
