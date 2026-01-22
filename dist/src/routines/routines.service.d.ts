import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class RoutinesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRoutineDto: CreateRoutineDto): Promise<{
        workoutDays: ({
            routineExercises: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                targetSets: number;
                targetReps: string | null;
                workoutDayId: string;
                exerciseId: string;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            routineId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        workoutDays: ({
            routineExercises: ({
                exercise: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    category: string | null;
                    muscleGroup: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                targetSets: number;
                targetReps: string | null;
                workoutDayId: string;
                exerciseId: string;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            routineId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__RoutineClient<({
        workoutDays: ({
            routineExercises: ({
                exercise: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    category: string | null;
                    muscleGroup: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                targetSets: number;
                targetReps: string | null;
                workoutDayId: string;
                exerciseId: string;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            routineId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateRoutineDto: UpdateRoutineDto): import("@prisma/client").Prisma.Prisma__RoutineClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__RoutineClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
