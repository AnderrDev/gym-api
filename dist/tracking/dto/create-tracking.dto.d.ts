export declare class CreateTrackingDto {
    userId: string;
    workoutDayId: string;
    setLogs: CreateSetLogDto[];
}
export declare class CreateSetLogDto {
    exerciseId: string;
    setNumber: number;
    weight: number;
    reps: number;
    isCompleted?: boolean;
}
