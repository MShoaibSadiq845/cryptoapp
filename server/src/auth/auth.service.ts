import {
  Injectable,
  Logger,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password?: string }) {
    const { name, email, password } = data;

    if (!email || !password || !name) {
      throw new BadRequestException('Name, email, and password are required');
    }

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createLocalUser({
      name,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: 'Account created successfully. Please sign in.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(credentials: { email: string; password?: string }) {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
        walletAddress: user.walletAddress,
      },
    };
  }

  async validateOAuthUser(profile: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }) {
    const user = await this.usersService.createOrUpdateFromGoogle(profile);
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      token,
      user,
    };
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}

