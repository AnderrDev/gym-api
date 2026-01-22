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
        const userStats = {
            age: user.age,
            weight: user.weight,
            height: user.height,
            experienceLevel: effectiveLevel
        };
        if (daysPerWeek <= 2) {
            days.push(await this.createDay(1, 'FULL BODY A', effectiveGoal, userStats));
            days.push(await this.createDay(2, 'FULL BODY B', effectiveGoal, userStats));
        }
        else if (daysPerWeek === 3) {
            days.push(await this.createDay(1, 'PUSH (Empuje)', effectiveGoal, userStats));
            days.push(await this.createDay(2, 'PULL (Tracción)', effectiveGoal, userStats));
            days.push(await this.createDay(3, 'LEGS (Pierna)', effectiveGoal, userStats));
        }
        else if (daysPerWeek === 4) {
            days.push(await this.createDay(1, 'UPPER (Torso)', effectiveGoal, userStats));
            days.push(await this.createDay(2, 'LOWER (Pierna)', effectiveGoal, userStats));
            days.push(await this.createDay(3, 'UPPER (Torso)', effectiveGoal, userStats));
            days.push(await this.createDay(4, 'LOWER (Pierna)', effectiveGoal, userStats));
        }
        else {
            days.push(await this.createDay(1, 'PUSH (Empuje)', effectiveGoal, userStats));
            days.push(await this.createDay(2, 'PULL (Tracción)', effectiveGoal, userStats));
            days.push(await this.createDay(3, 'LEGS (Pierna)', effectiveGoal, userStats));
            days.push(await this.createDay(4, 'UPPER (Torso)', effectiveGoal, userStats));
            days.push(await this.createDay(5, 'LOWER (Pierna)', effectiveGoal, userStats));
            if (daysPerWeek === 6) {
                days.push(await this.createDay(6, 'MOVILIDAD / ACCESORIOS', effectiveGoal, userStats));
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
    async createDay(order, name, goal, userStats) {
        const exercises = [];
        const reps = this.getRepsForGoal(goal);
        const bmi = this.calculateBMI(userStats.weight, userStats.height);
        const restTime = this.getRestTimeForGoal(goal, userStats.age);
        if (name.includes('PUSH')) {
            exercises.push({ name: 'Press banca barra', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Press inclinado mancuernas', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Press militar', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Aperturas con mancuernas', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Fondos en paralelas', targetSets: 3, targetReps: '8-12' });
            exercises.push({ name: 'Extensión tríceps', targetSets: 3, targetReps: '12-15' });
        }
        else if (name.includes('PULL')) {
            exercises.push({ name: 'Peso muerto', targetSets: 4, targetReps: '5-8' });
            exercises.push({ name: 'Jalón al pecho', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Remo con barra', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Remo en polea', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Face pulls', targetSets: 3, targetReps: '15-20' });
            exercises.push({ name: 'Curl bíceps', targetSets: 3, targetReps: '10-12' });
        }
        else if (name.includes('LEGS')) {
            exercises.push({ name: 'Sentadilla', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Prensa', targetSets: 4, targetReps: '8-12' });
            exercises.push({ name: 'Peso muerto rumano', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Zancadas', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Extensiones de pierna', targetSets: 3, targetReps: '12-15' });
            exercises.push({ name: 'Curl femoral', targetSets: 3, targetReps: '12-15' });
            exercises.push({ name: 'Elevación de gemelos', targetSets: 4, targetReps: '15-20' });
        }
        else if (name.includes('UPPER')) {
            exercises.push({ name: 'Press banca barra', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Remo con barra', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Press militar', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Jalón al pecho', targetSets: 3, targetReps: '8-12' });
            exercises.push({ name: 'Fondos en paralelas', targetSets: 3, targetReps: '8-12' });
            exercises.push({ name: 'Curl bíceps', targetSets: 3, targetReps: '10-12' });
        }
        else if (name.includes('LOWER')) {
            exercises.push({ name: 'Sentadilla', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Peso muerto rumano', targetSets: 4, targetReps: '6-8' });
            exercises.push({ name: 'Prensa', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Zancadas', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Curl femoral', targetSets: 3, targetReps: '12-15' });
            exercises.push({ name: 'Elevación de gemelos', targetSets: 4, targetReps: '15-20' });
        }
        else {
            exercises.push({ name: 'Sentadilla', targetSets: 4, targetReps: '8-10' });
            exercises.push({ name: 'Press banca barra', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Peso muerto', targetSets: 3, targetReps: '6-8' });
            exercises.push({ name: 'Press militar', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Remo con barra', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Fondos en paralelas', targetSets: 3, targetReps: '8-12' });
        }
        const generatedExercises = [];
        for (let i = 0; i < exercises.length; i++) {
            const ex = exercises[i];
            if (!this.shouldIncludeExercise(ex.name, userStats.age, userStats.experienceLevel)) {
                continue;
            }
            const dbEx = await this.prisma.exercise.findFirst({
                where: { name: { contains: ex.name, mode: 'insensitive' } }
            });
            if (dbEx) {
                const personalizedSets = this.adjustSetsForUser(ex.targetSets, userStats.age, userStats.experienceLevel, bmi);
                generatedExercises.push({
                    exerciseId: dbEx.id,
                    name: dbEx.name,
                    targetSets: personalizedSets,
                    targetReps: ex.targetReps,
                    restTime: restTime,
                    defaultWeight: null,
                    order: generatedExercises.length + 1
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
    calculateBMI(weight, height) {
        if (!weight || !height || height === 0)
            return null;
        const heightInMeters = height > 3 ? height / 100 : height;
        return weight / (heightInMeters * heightInMeters);
    }
    getVolumeMultiplier(age, experienceLevel) {
        let multiplier = 1.0;
        if (age) {
            if (age >= 60)
                multiplier *= 0.7;
            else if (age >= 46)
                multiplier *= 0.85;
            else if (age >= 31)
                multiplier *= 0.95;
        }
        switch (experienceLevel?.toLowerCase()) {
            case 'beginner':
            case 'principiante':
                multiplier *= 0.8;
                break;
            case 'intermediate':
            case 'intermedio':
                multiplier *= 1.0;
                break;
            case 'advanced':
            case 'avanzado':
                multiplier *= 1.2;
                break;
        }
        return multiplier;
    }
    adjustSetsForUser(baseSets, age, experienceLevel, bmi) {
        let sets = baseSets;
        const volumeMultiplier = this.getVolumeMultiplier(age, experienceLevel);
        sets = Math.round(sets * volumeMultiplier);
        if (bmi) {
            if (bmi >= 30)
                sets = Math.max(2, sets - 1);
            else if (bmi < 18.5)
                sets = Math.min(sets + 1, baseSets + 1);
        }
        return Math.max(2, Math.min(sets, 5));
    }
    getRestTimeForGoal(goal, age) {
        let baseRest = 90;
        switch (goal) {
            case 'strength':
                baseRest = 180;
                break;
            case 'gain_muscle':
                baseRest = 90;
                break;
            case 'lose_weight':
            case 'endurance':
                baseRest = 60;
                break;
        }
        if (age && age >= 50) {
            baseRest = Math.round(baseRest * 1.3);
        }
        return baseRest;
    }
    shouldIncludeExercise(exerciseName, age, experienceLevel) {
        const isAdvanced = experienceLevel?.toLowerCase() === 'advanced' || experienceLevel?.toLowerCase() === 'avanzado';
        const isBeginner = experienceLevel?.toLowerCase() === 'beginner' || experienceLevel?.toLowerCase() === 'principiante';
        const isOlder = age && age >= 50;
        const highImpact = ['Box jumps', 'Burpees', 'Jump squats'];
        if (highImpact.some(ex => exerciseName.includes(ex)) && (isOlder || isBeginner)) {
            return false;
        }
        const advancedMoves = ['Muscle up', 'Pistol squat', 'Handstand'];
        if (advancedMoves.some(ex => exerciseName.includes(ex)) && !isAdvanced) {
            return false;
        }
        return true;
    }
};
exports.RoutineGeneratorService = RoutineGeneratorService;
exports.RoutineGeneratorService = RoutineGeneratorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoutineGeneratorService);
//# sourceMappingURL=routine-generator.service.js.map