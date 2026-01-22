import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface GeneratedExercise {
    exerciseId: string;
    name: string;
    targetSets: number;
    targetReps: string;
    restTime?: number | null;
    defaultWeight?: number | null;
    order: number;
}

export interface GeneratedDay {
    order: number;
    name: string;
    exercises: GeneratedExercise[];
}

@Injectable()
export class RoutineGeneratorService {
    constructor(private prisma: PrismaService) { }

    async generateRoutine(userId: string, config?: { trainingDays?: number, goal?: string, experienceLevel?: string }) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } }) as any;
        if (!user) throw new Error('User not found');

        // Actualizar perfil del usuario si se proporcionan datos nuevos
        if (config) {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    trainingDays: config.trainingDays || user.trainingDays,
                    goal: config.goal || user.goal,
                    experienceLevel: config.experienceLevel || user.experienceLevel
                } as any
            });
        }

        const effectiveGoal = config?.goal || user.goal;
        const effectiveLevel = config?.experienceLevel || user.experienceLevel;
        const daysPerWeek = config?.trainingDays || user.trainingDays || 3;
        const trainingMonths = user.trainingMonths || 0;

        // Lógica básica del algoritmo generativo
        const routineName = `Plan de ${user.name || 'Guerrero'}: ${this.getFriendlyGoal(effectiveGoal)}`;
        const description = `Rutina personalizada para nivel ${effectiveLevel || 'principiante'} enfocada en ${effectiveGoal || 'salud general'} (${daysPerWeek} días/semana).`;

        const days: GeneratedDay[] = [];

        // User stats for personalization
        const userStats = {
            age: user.age,
            weight: user.weight,
            height: user.height,
            experienceLevel: effectiveLevel
        };

        // Algoritmo de distribución de días
        if (daysPerWeek <= 2) {
            // Full body para poca frecuencia
            days.push(await this.createDay(1, 'FULL BODY A', effectiveGoal, userStats));
            days.push(await this.createDay(2, 'FULL BODY B', effectiveGoal, userStats));
        } else if (daysPerWeek === 3) {
            // Clásico PPL o Full Body avanzado
            days.push(await this.createDay(1, 'PUSH (Empuje)', effectiveGoal, userStats));
            days.push(await this.createDay(2, 'PULL (Tracción)', effectiveGoal, userStats));
            days.push(await this.createDay(3, 'LEGS (Pierna)', effectiveGoal, userStats));
        } else if (daysPerWeek === 4) {
            // Upper / Lower
            days.push(await this.createDay(1, 'UPPER (Torso)', effectiveGoal, userStats));
            days.push(await this.createDay(2, 'LOWER (Pierna)', effectiveGoal, userStats));
            days.push(await this.createDay(3, 'UPPER (Torso)', effectiveGoal, userStats));
            days.push(await this.createDay(4, 'LOWER (Pierna)', effectiveGoal, userStats));
        } else {
            // 5 o 6 días: PPL + Ajustes
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

    private getFriendlyGoal(goal: string): string {
        const goals: Record<string, string> = {
            gain_muscle: 'Hipertrofia',
            lose_weight: 'Definición',
            strength: 'Fuerza Máxima',
            endurance: 'Resistencia Muscular'
        };
        return goals[goal] || 'Acondicionamiento';
    }

    private async createDay(
        order: number,
        name: string,
        goal: string,
        userStats: { age: number | null; weight: number | null; height: number | null; experienceLevel: string | null }
    ): Promise<GeneratedDay> {
        const exercises: any[] = [];
        const reps = this.getRepsForGoal(goal);
        const bmi = this.calculateBMI(userStats.weight, userStats.height);
        const restTime = this.getRestTimeForGoal(goal, userStats.age);

        // Science-based: 4-6 exercises per session, targeting different movement patterns
        if (name.includes('PUSH')) {
            // Compound movements first, then isolation
            exercises.push({ name: 'Press banca barra', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Press inclinado mancuernas', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Press militar', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Aperturas con mancuernas', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Fondos en paralelas', targetSets: 3, targetReps: '8-12' });
            exercises.push({ name: 'Extensión tríceps', targetSets: 3, targetReps: '12-15' });
        } else if (name.includes('PULL')) {
            exercises.push({ name: 'Peso muerto', targetSets: 4, targetReps: '5-8' });
            exercises.push({ name: 'Jalón al pecho', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Remo con barra', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Remo en polea', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Face pulls', targetSets: 3, targetReps: '15-20' });
            exercises.push({ name: 'Curl bíceps', targetSets: 3, targetReps: '10-12' });
        } else if (name.includes('LEGS')) {
            exercises.push({ name: 'Sentadilla', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Prensa', targetSets: 4, targetReps: '8-12' });
            exercises.push({ name: 'Peso muerto rumano', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Zancadas', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Extensiones de pierna', targetSets: 3, targetReps: '12-15' });
            exercises.push({ name: 'Curl femoral', targetSets: 3, targetReps: '12-15' });
            exercises.push({ name: 'Elevación de gemelos', targetSets: 4, targetReps: '15-20' });
        } else if (name.includes('UPPER')) {
            // Upper body day - mix of push and pull
            exercises.push({ name: 'Press banca barra', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Remo con barra', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Press militar', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Jalón al pecho', targetSets: 3, targetReps: '8-12' });
            exercises.push({ name: 'Fondos en paralelas', targetSets: 3, targetReps: '8-12' });
            exercises.push({ name: 'Curl bíceps', targetSets: 3, targetReps: '10-12' });
        } else if (name.includes('LOWER')) {
            // Lower body day
            exercises.push({ name: 'Sentadilla', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Peso muerto rumano', targetSets: 4, targetReps: '6-8' });
            exercises.push({ name: 'Prensa', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Zancadas', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Curl femoral', targetSets: 3, targetReps: '12-15' });
            exercises.push({ name: 'Elevación de gemelos', targetSets: 4, targetReps: '15-20' });
        } else {
            // Full body - compound movements
            exercises.push({ name: 'Sentadilla', targetSets: 4, targetReps: '8-10' });
            exercises.push({ name: 'Press banca barra', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Peso muerto', targetSets: 3, targetReps: '6-8' });
            exercises.push({ name: 'Press militar', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Remo con barra', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Fondos en paralelas', targetSets: 3, targetReps: '8-12' });
        }

        const generatedExercises: GeneratedExercise[] = [];
        for (let i = 0; i < exercises.length; i++) {
            const ex = exercises[i];

            // Skip exercises not suitable for user
            if (!this.shouldIncludeExercise(ex.name, userStats.age, userStats.experienceLevel)) {
                continue;
            }

            const dbEx = await this.prisma.exercise.findFirst({
                where: { name: { contains: ex.name, mode: 'insensitive' } }
            });

            if (dbEx) {
                // Personalize sets based on user stats
                const personalizedSets = this.adjustSetsForUser(
                    ex.targetSets,
                    userStats.age,
                    userStats.experienceLevel,
                    bmi
                );

                generatedExercises.push({
                    exerciseId: dbEx.id,
                    name: dbEx.name,
                    targetSets: personalizedSets,
                    targetReps: ex.targetReps,
                    restTime: restTime,
                    defaultWeight: null,
                    order: generatedExercises.length + 1 // Use actual index after filtering
                });
            }
        }

        return { order, name, exercises: generatedExercises };
    }

    private getRepsForGoal(goal: string): string {
        switch (goal) {
            case 'strength': return '4-6';
            case 'gain_muscle': return '8-12';
            case 'lose_weight': return '12-15';
            default: return '10-12';
        }
    }

    // ============ INTELLIGENT PERSONALIZATION METHODS ============

    private calculateBMI(weight: number | null, height: number | null): number | null {
        if (!weight || !height || height === 0) return null;
        // height in cm, convert to meters
        const heightInMeters = height > 3 ? height / 100 : height;
        return weight / (heightInMeters * heightInMeters);
    }

    private getVolumeMultiplier(age: number | null, experienceLevel: string | null): number {
        let multiplier = 1.0;

        // Age-based adjustment (recovery capacity)
        if (age) {
            if (age >= 60) multiplier *= 0.7;        // 30% reduction for seniors
            else if (age >= 46) multiplier *= 0.85;  // 15% reduction for mature adults
            else if (age >= 31) multiplier *= 0.95;  // 5% reduction for adults
            // 18-30: full volume (1.0)
        }

        // Experience-based adjustment
        switch (experienceLevel?.toLowerCase()) {
            case 'beginner':
            case 'principiante':
                multiplier *= 0.8; // Start with 80% volume
                break;
            case 'intermediate':
            case 'intermedio':
                multiplier *= 1.0; // Standard volume
                break;
            case 'advanced':
            case 'avanzado':
                multiplier *= 1.2; // Can handle more volume
                break;
        }

        return multiplier;
    }

    private adjustSetsForUser(baseSets: number, age: number | null, experienceLevel: string | null, bmi: number | null): number {
        let sets = baseSets;
        const volumeMultiplier = this.getVolumeMultiplier(age, experienceLevel);

        sets = Math.round(sets * volumeMultiplier);

        // BMI adjustments (joint stress consideration)
        if (bmi) {
            if (bmi >= 30) sets = Math.max(2, sets - 1); // Reduce volume for obese (joint protection)
            else if (bmi < 18.5) sets = Math.min(sets + 1, baseSets + 1); // Slightly more for underweight
        }

        return Math.max(2, Math.min(sets, 5)); // Clamp between 2-5 sets
    }

    private getRestTimeForGoal(goal: string | null, age: number | null): number {
        let baseRest = 90; // Default 90 seconds

        switch (goal) {
            case 'strength':
                baseRest = 180; // 3 minutes for strength
                break;
            case 'gain_muscle':
                baseRest = 90; // 1.5 minutes for hypertrophy
                break;
            case 'lose_weight':
            case 'endurance':
                baseRest = 60; // 1 minute for fat loss/endurance
                break;
        }

        // Older users need more recovery
        if (age && age >= 50) {
            baseRest = Math.round(baseRest * 1.3);
        }

        return baseRest;
    }

    private shouldIncludeExercise(exerciseName: string, age: number | null, experienceLevel: string | null): boolean {
        const isAdvanced = experienceLevel?.toLowerCase() === 'advanced' || experienceLevel?.toLowerCase() === 'avanzado';
        const isBeginner = experienceLevel?.toLowerCase() === 'beginner' || experienceLevel?.toLowerCase() === 'principiante';
        const isOlder = age && age >= 50;

        // High-impact exercises - avoid for older users or beginners
        const highImpact = ['Box jumps', 'Burpees', 'Jump squats'];
        if (highImpact.some(ex => exerciseName.includes(ex)) && (isOlder || isBeginner)) {
            return false;
        }

        // Advanced exercises - only for experienced
        const advancedMoves = ['Muscle up', 'Pistol squat', 'Handstand'];
        if (advancedMoves.some(ex => exerciseName.includes(ex)) && !isAdvanced) {
            return false;
        }

        return true;
    }
}
