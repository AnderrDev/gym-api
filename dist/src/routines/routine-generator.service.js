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
exports.RoutineGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoutineGeneratorService = class RoutineGeneratorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateRoutine(userId, config) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new Error('User not found');
        if (config) {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    trainingDays: config.trainingDays || user.trainingDays,
                    goal: config.goal || user.goal,
                    experienceLevel: config.experienceLevel || user.experienceLevel
                }
            });
        }
        const effectiveGoal = config?.goal || user.goal;
        const effectiveLevel = config?.experienceLevel || user.experienceLevel;
        const daysPerWeek = config?.trainingDays || user.trainingDays || 3;
        const trainingMonths = user.trainingMonths || 0;
        const routineName = `Plan de ${user.name || 'Guerrero'}: ${this.getFriendlyGoal(effectiveGoal)}`;
        const description = `Rutina personalizada para nivel ${effectiveLevel || 'principiante'} enfocada en ${effectiveGoal || 'salud general'} (${daysPerWeek} días/semana).`;
        const days = [];
        if (daysPerWeek <= 2) {
            days.push(await this.createDay(1, 'FULL BODY A', effectiveGoal));
            days.push(await this.createDay(2, 'FULL BODY B', effectiveGoal));
        }
        else if (daysPerWeek === 3) {
            days.push(await this.createDay(1, 'PUSH (Empuje)', effectiveGoal));
            days.push(await this.createDay(2, 'PULL (Tracción)', effectiveGoal));
            days.push(await this.createDay(3, 'LEGS (Pierna)', effectiveGoal));
        }
        else if (daysPerWeek === 4) {
            days.push(await this.createDay(1, 'UPPER (Torso)', effectiveGoal));
            days.push(await this.createDay(2, 'LOWER (Pierna)', effectiveGoal));
            days.push(await this.createDay(3, 'UPPER (Torso)', effectiveGoal));
            days.push(await this.createDay(4, 'LOWER (Pierna)', effectiveGoal));
        }
        else {
            days.push(await this.createDay(1, 'PUSH (Empuje)', effectiveGoal));
            days.push(await this.createDay(2, 'PULL (Tracción)', effectiveGoal));
            days.push(await this.createDay(3, 'LEGS (Pierna)', effectiveGoal));
            days.push(await this.createDay(4, 'UPPER (Torso)', effectiveGoal));
            days.push(await this.createDay(5, 'LOWER (Pierna)', effectiveGoal));
            if (daysPerWeek === 6) {
                days.push(await this.createDay(6, 'MOVILIDAD / ACCESORIOS', effectiveGoal));
            }
        }
        return {
            name: routineName,
            description,
            userId: user.id,
            days
        };
    }
    getFriendlyGoal(goal) {
        const goals = {
            gain_muscle: 'Hipertrofia',
            lose_weight: 'Definición',
            strength: 'Fuerza Máxima',
            endurance: 'Resistencia Muscular'
        };
        return goals[goal] || 'Acondicionamiento';
    }
    async createDay(order, name, goal) {
        const exercises = [];
        const reps = this.getRepsForGoal(goal);
        if (name.includes('PUSH')) {
            exercises.push({ name: 'Press banca barra', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Press militar', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Extensión tríceps', targetSets: 3, targetReps: '12-15' });
        }
        else if (name.includes('PULL')) {
            exercises.push({ name: 'Jalón al pecho', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Remo con barra', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Curl bíceps', targetSets: 3, targetReps: '10-12' });
        }
        else if (name.includes('LEGS')) {
            exercises.push({ name: 'Sentadilla', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Peso muerto rumano', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Extensiones de pierna', targetSets: 3, targetReps: '12-15' });
        }
        else {
            exercises.push({ name: 'Prensa', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Remo en polea', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Press plano mancuernas', targetSets: 3, targetReps: '10-12' });
        }
        const generatedExercises = [];
        for (let i = 0; i < exercises.length; i++) {
            const ex = exercises[i];
            const dbEx = await this.prisma.exercise.findFirst({
                where: { name: { contains: ex.name, mode: 'insensitive' } }
            });
            if (dbEx) {
                generatedExercises.push({
                    exerciseId: dbEx.id,
                    name: dbEx.name,
                    targetSets: ex.targetSets,
                    targetReps: ex.targetReps,
                    order: i + 1
                });
            }
        }
        return { order, name, exercises: generatedExercises };
    }
    getRepsForGoal(goal) {
        switch (goal) {
            case 'strength': return '4-6';
            case 'gain_muscle': return '8-12';
            case 'lose_weight': return '12-15';
            default: return '10-12';
        }
    }
};
exports.RoutineGeneratorService = RoutineGeneratorService;
exports.RoutineGeneratorService = RoutineGeneratorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoutineGeneratorService);
//# sourceMappingURL=routine-generator.service.js.map