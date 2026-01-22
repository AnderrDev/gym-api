import { PrismaService } from '../prisma/prisma.service';
export interface GeneratedExercise {
    exerciseId: string;
    name: string;
    targetSets: number;
    targetReps: string;
    order: number;
}
export interface GeneratedDay {
    order: number;
    name: string;
    exercises: GeneratedExercise[];
}
export declare class RoutineGeneratorService {
    private prisma;
    constructor(prisma: PrismaService);
    generateRoutine(userId: string, config?: {
        trainingDays?: number;
        goal?: string;
        experienceLevel?: string;
    }): Promise<{
        name: string;
        description: string;
        userId: any;
        days: GeneratedDay[];
    }>;
    private getFriendlyGoal;
    private createDay;
    private getRepsForGoal;
}
