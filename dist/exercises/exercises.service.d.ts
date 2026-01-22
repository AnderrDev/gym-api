import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ExercisesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createExerciseDto: CreateExerciseDto): import("@prisma/client").Prisma.Prisma__ExerciseClient<{
        name: string;
        category: string | null;
        muscleGroup: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        category: string | null;
        muscleGroup: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ExerciseClient<{
        name: string;
        category: string | null;
        muscleGroup: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateExerciseDto: UpdateExerciseDto): import("@prisma/client").Prisma.Prisma__ExerciseClient<{
        name: string;
        category: string | null;
        muscleGroup: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ExerciseClient<{
        name: string;
        category: string | null;
        muscleGroup: string | null;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
