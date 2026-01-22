import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
export declare class TrackingController {
    private readonly trackingService;
    constructor(trackingService: TrackingService);
    create(createTrackingDto: CreateTrackingDto): Promise<{
        setLogs: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: number;
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
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        setLogs: ({
            exercise: {
                id: string;
                name: string;
                category: string | null;
                muscleGroup: string | null;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: number;
            exerciseId: string;
            setNumber: number;
            reps: number;
            isCompleted: boolean;
            workoutSessionId: string;
        })[];
        user: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            age: number | null;
            height: number | null;
            weight: number | null;
            goal: string | null;
            experienceLevel: string | null;
            trainingDays: number | null;
        };
        workoutDay: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            routineId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        workoutDayId: string;
        date: Date;
    })[]>;
    findByUser(userId: string): import("@prisma/client").Prisma.PrismaPromise<({
        setLogs: ({
            exercise: {
                id: string;
                name: string;
                category: string | null;
                muscleGroup: string | null;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: number;
            exerciseId: string;
            setNumber: number;
            reps: number;
            isCompleted: boolean;
            workoutSessionId: string;
        })[];
        workoutDay: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            routineId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        workoutDayId: string;
        date: Date;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__WorkoutSessionClient<({
        setLogs: ({
            exercise: {
                id: string;
                name: string;
                category: string | null;
                muscleGroup: string | null;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            weight: number;
            exerciseId: string;
            setNumber: number;
            reps: number;
            isCompleted: boolean;
            workoutSessionId: string;
        })[];
        user: {
            id: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            age: number | null;
            height: number | null;
            weight: number | null;
            goal: string | null;
            experienceLevel: string | null;
            trainingDays: number | null;
        };
        workoutDay: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            routineId: string;
        };
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
        createdAt: Date;
        updatedAt: Date;
        weight: number;
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
