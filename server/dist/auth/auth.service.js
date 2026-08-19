"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users/users.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(data) {
        const { name, email, password } = data;
        if (!email || !password || !name) {
            throw new common_1.BadRequestException('Name, email, and password are required');
        }
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('An account with this email already exists');
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
    async login(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        const user = await this.usersService.findByEmail(email);
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid email or password');
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
    async validateOAuthUser(profile) {
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
    async verifyToken(token) {
        return this.jwtService.verify(token);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map