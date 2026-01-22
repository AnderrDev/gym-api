export declare class CreateRoutineDto {
    name: string;
    description?: string;
    userId: string;
    days?: CreateWorkoutDayDto[];
}
export declare class CreateWorkoutDayDto {
    order: number;
    name: string;
    exercises?: CreateRoutineExerciseDto[];
}
export declare class CreateRoutineExerciseDto {
    exerciseId: string;
    targetSets: number;
    targetReps: string;
    restTime?: number;
    defaultWeight?: number;
    order: number;
}
