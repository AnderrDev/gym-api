import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class TrackingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTrackingDto: CreateTrackingDto): import("@prisma/client").Prisma.Prisma__WorkoutSessionClient<{
        setLogs: {
            id: string;
            weight: number;
            createdAt: Date;
            updatedAt: Date;
            exerciseId: string;
            setNumber: number;
            reps: number;
            isCompleted: boolean;
            workoutSessionId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        workoutDayId: string;
        date: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            age: number | null;
            height: number | null;
            weight: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        workoutDay: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            routineId: string;
        };
        setLogs: ({
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
            weight: number;
            createdAt: Date;
            updatedAt: Date;
            exerciseId: string;
            setNumber: number;
            reps: number;
            isCompleted: boolean;
            workoutSessionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        workoutDayId: string;
        date: Date;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__WorkoutSessionClient<({
        user: {
            id: string;
            email: string;
            password: string;
            name: string | null;
            age: number | null;
            height: number | null;
            weight: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        workoutDay: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            routineId: string;
        };
        setLogs: ({
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
            weight: number;
            createdAt: Date;
            updatedAt: Date;
            exerciseId: string;
            setNumber: number;
            reps: number;
            isCompleted: boolean;
            workoutSessionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        workoutDayId: string;
        date: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getExerciseStats(userId: string, exerciseId: string): import("@prisma/client").Prisma.PrismaPromise<({
        workoutSession: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            workoutDayId: string;
            date: Date;
        };
    } & {
        id: string;
        weight: number;
        createdAt: Date;
        updatedAt: Date;
        exerciseId: string;
        setNumber: number;
        reps: number;
        isCompleted: boolean;
        workoutSessionId: string;
    })[]>;
    update(id: string, updateTrackingDto: UpdateTrackingDto): import("@prisma/client").Prisma.Prisma__WorkoutSessionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        workoutDayId: string;
        date: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__WorkoutSessionClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        workoutDayId: string;
        date: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
