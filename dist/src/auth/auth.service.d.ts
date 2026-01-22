import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string | null;
        age: number | null;
        height: number | null;
        weight: number | null;
        createdAt: Date;
        updatedAt: Date;
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
