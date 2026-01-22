import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        age: number | null;
        height: number | null;
        weight: number | null;
        goal: string | null;
        experienceLevel: string | null;
        trainingDays: number | null;
    }>;
    login(loginDto: Record<string, any>): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            age: number | null;
            height: number | null;
            weight: number | null;
        };
    }>;
}
