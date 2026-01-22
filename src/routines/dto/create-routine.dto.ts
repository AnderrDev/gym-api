export class CreateRoutineDto {
    name: string;
    description?: string;
    userId: string;
    days?: CreateWorkoutDayDto[];
}

export class CreateWorkoutDayDto {
    order: number;
    name: string;
    exercises?: CreateRoutineExerciseDto[];
}

export class CreateRoutineExerciseDto {
    exerciseId: string;
    targetSets: number;
    targetReps: string;
    order: number;
}
