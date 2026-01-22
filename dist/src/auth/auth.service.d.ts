import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: CreateUserDto): Promise<{
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
    login(email: string, pass: string): Promise<{
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
