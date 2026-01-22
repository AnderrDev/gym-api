import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineGeneratorService } from './routine-generator.service';
export declare class RoutinesController {
    private readonly routinesService;
    private readonly generatorService;
    constructor(routinesService: RoutinesService, generatorService: RoutineGeneratorService);
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
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }>;
    generate(userId: string, config?: {
        trainingDays?: number;
        goal?: string;
        experienceLevel?: string;
    }): Promise<{
        name: string;
        description: string;
        userId: any;
        days: import("./routine-generator.service").GeneratedDay[];
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        workoutDays: ({
            routineExercises: ({
                exercise: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    category: string | null;
                    muscleGroup: string | null;
                    description: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    })[]>;
    findByUser(userId: string): import("@prisma/client").Prisma.PrismaPromise<({
        workoutDays: ({
            routineExercises: ({
                exercise: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    category: string | null;
                    muscleGroup: string | null;
                    description: string | null;
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
                    category: string | null;
                    muscleGroup: string | null;
                    description: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateRoutineDto: UpdateRoutineDto): Promise<{
        workoutDays: ({
            routineExercises: ({
                exercise: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    category: string | null;
                    muscleGroup: string | null;
                    description: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__RoutineClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
