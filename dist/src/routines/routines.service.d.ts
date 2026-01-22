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
                restTime: number | null;
                defaultWeight: number | null;
                exerciseId: string;
                workoutDayId: string;
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        workoutDays: ({
            routineExercises: ({
                exercise: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
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
                restTime: number | null;
                defaultWeight: number | null;
                exerciseId: string;
                workoutDayId: string;
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    findByUserId(userId: string): import("@prisma/client").Prisma.PrismaPromise<({
        workoutDays: ({
            routineExercises: ({
                exercise: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
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
                restTime: number | null;
                defaultWeight: number | null;
                exerciseId: string;
                workoutDayId: string;
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__RoutineClient<({
        workoutDays: ({
            routineExercises: ({
                exercise: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
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
                restTime: number | null;
                defaultWeight: number | null;
                exerciseId: string;
                workoutDayId: string;
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateRoutineDto: UpdateRoutineDto): Promise<{
        workoutDays: ({
            routineExercises: ({
                exercise: {
                    id: string;
                    name: string;
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
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
                restTime: number | null;
                defaultWeight: number | null;
                exerciseId: string;
                workoutDayId: string;
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
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__RoutineClient<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
