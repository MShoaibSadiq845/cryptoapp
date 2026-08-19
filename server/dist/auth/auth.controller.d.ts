import { Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: {
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
    login(body: {
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
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    getProfile(req: any): {
        success: boolean;
        user: any;
    };
    updateWallet(req: any, walletAddress: string): Promise<{
        success: boolean;
        user: import("../users/schemas/user.schema").UserDocument;
    }>;
    updatePicture(req: any, picture: string): Promise<{
        success: boolean;
        user: import("../users/schemas/user.schema").UserDocument;
    }>;
    getStatus(): {
        status: string;
        service: string;
        timestamp: string;
    };
}
