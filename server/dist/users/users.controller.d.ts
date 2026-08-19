import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<{
        success: boolean;
        count: number;
        users: import("./schemas/user.schema").UserDocument[];
    }>;
    updateRole(id: string, role: string): Promise<{
        success: boolean;
        user: import("./schemas/user.schema").UserDocument;
    }>;
}
