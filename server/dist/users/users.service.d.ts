import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | null>;
    findByGoogleId(googleId: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDocument | null>;
    createOrUpdateFromGoogle(profile: {
        googleId: string;
        email: string;
        name: string;
        picture?: string;
    }): Promise<UserDocument>;
    createLocalUser(userData: {
        email: string;
        name: string;
        password?: string;
    }): Promise<UserDocument>;
    updateWallet(id: string, walletAddress: string): Promise<UserDocument | null>;
    updatePicture(id: string, picture: string): Promise<UserDocument | null>;
    findAll(): Promise<UserDocument[]>;
    updateRole(id: string, role: string): Promise<UserDocument | null>;
}
