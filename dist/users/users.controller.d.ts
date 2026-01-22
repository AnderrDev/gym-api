import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): import("@prisma/client").Prisma.Prisma__UserClient<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__UserClient<({
        sessions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            workoutDayId: string;
            date: Date;
        }[];
        routines: {
            name: string;
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        }[];
    } & {
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateUserDto: UpdateUserDto): import("@prisma/client").Prisma.Prisma__UserClient<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
