import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(data: {
        name: string;
        email: string;
        password?: string;
    }): Promise<{
        success: boolean;
        message: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
        };
    }>;
    login(credentials: {
        email: string;
        password?: string;
    }): Promise<{
        success: boolean;
        token: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            picture: string;
            role: string;
            walletAddress: string;
        };
    }>;
    validateOAuthUser(profile: {
        googleId: string;
        email: string;
        name: string;
        picture?: string;
    }): Promise<{
        token: string;
        user: import("../users/schemas/user.schema").UserDocument;
    }>;
    verifyToken(token: string): Promise<any>;
}
