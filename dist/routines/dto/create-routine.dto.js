"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoutineExerciseDto = exports.CreateWorkoutDayDto = exports.CreateRoutineDto = void 0;
class CreateRoutineDto {
    name;
    description;
    userId;
    days;
}
exports.CreateRoutineDto = CreateRoutineDto;
class CreateWorkoutDayDto {
    order;
    name;
    exercises;
}
exports.CreateWorkoutDayDto = CreateWorkoutDayDto;
class CreateRoutineExerciseDto {
    exerciseId;
    targetSets;
    targetReps;
    order;
}
exports.CreateRoutineExerciseDto = CreateRoutineExerciseDto;
//# sourceMappingURL=create-routine.dto.js.map