"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutinesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoutinesService = class RoutinesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRoutineDto) {
        const { name, description, userId, days } = createRoutineDto;
        return this.prisma.routine.create({
            data: {
                name,
                description,
                userId,
                workoutDays: {
                    create: days?.map((day) => ({
                        name: day.name,
                        order: day.order,
                        routineExercises: {
                            create: day.exercises?.map((ex) => ({
                                exerciseId: ex.exerciseId,
                                targetSets: ex.targetSets,
                                targetReps: ex.targetReps,
                                order: ex.order,
                            })),
                        },
                    })),
                },
            },
            include: {
                workoutDays: {
                    include: {
                        routineExercises: true,
                    },
                },
            },
        });
    }
    findAll() {
        return this.prisma.routine.findMany({
            include: {
                workoutDays: {
                    include: {
                        routineExercises: {
                            include: {
                                exercise: true,
                            },
                        },
                    },
                },
            },
        });
    }
    findOne(id) {
        return this.prisma.routine.findUnique({
            where: { id },
            include: {
                workoutDays: {
                    include: {
                        routineExercises: {
                            include: {
                                exercise: true,
                            },
                        },
                    },
                },
            },
        });
    }
    update(id, updateRoutineDto) {
        return this.prisma.routine.update({
            where: { id },
            data: {
                name: updateRoutineDto.name,
                description: updateRoutineDto.description,
            },
        });
    }
    remove(id) {
        return this.prisma.routine.delete({
            where: { id },
        });
    }
};
exports.RoutinesService = RoutinesService;
exports.RoutinesService = RoutinesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoutinesService);
//# sourceMappingURL=routines.service.js.map