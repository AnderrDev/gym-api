import { Injectable } from '@nestjs/common';
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

        // Algoritmo de distribución de días
        if (daysPerWeek <= 2) {
            // Full body para poca frecuencia
            days.push(await this.createDay(1, 'FULL BODY A', effectiveGoal));
            days.push(await this.createDay(2, 'FULL BODY B', effectiveGoal));
        } else if (daysPerWeek === 3) {
            // Clásico PPL o Full Body avanzado
            days.push(await this.createDay(1, 'PUSH (Empuje)', effectiveGoal));
            days.push(await this.createDay(2, 'PULL (Tracción)', effectiveGoal));
            days.push(await this.createDay(3, 'LEGS (Pierna)', effectiveGoal));
        } else if (daysPerWeek === 4) {
            // Upper / Lower
            days.push(await this.createDay(1, 'UPPER (Torso)', effectiveGoal));
            days.push(await this.createDay(2, 'LOWER (Pierna)', effectiveGoal));
            days.push(await this.createDay(3, 'UPPER (Torso)', effectiveGoal));
            days.push(await this.createDay(4, 'LOWER (Pierna)', effectiveGoal));
        } else {
            // 5 o 6 días: PPL + Ajustes
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

    private getFriendlyGoal(goal: string): string {
        const goals: Record<string, string> = {
            gain_muscle: 'Hipertrofia',
            lose_weight: 'Definición',
            strength: 'Fuerza Máxima',
            endurance: 'Resistencia Muscular'
        };
        return goals[goal] || 'Acondicionamiento';
    }

    private async createDay(order: number, name: string, goal: string): Promise<GeneratedDay> {
        const exercises: any[] = [];
        const reps = this.getRepsForGoal(goal);

        if (name.includes('PUSH')) {
            exercises.push({ name: 'Press banca barra', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Press militar', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Extensión tríceps', targetSets: 3, targetReps: '12-15' });
        } else if (name.includes('PULL')) {
            exercises.push({ name: 'Jalón al pecho', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Remo con barra', targetSets: 3, targetReps: reps });
            exercises.push({ name: 'Curl bíceps', targetSets: 3, targetReps: '10-12' });
        } else if (name.includes('LEGS')) {
            exercises.push({ name: 'Sentadilla', targetSets: 4, targetReps: reps });
            exercises.push({ name: 'Peso muerto rumano', targetSets: 3, targetReps: '8-10' });
            exercises.push({ name: 'Extensiones de pierna', targetSets: 3, targetReps: '12-15' });
        } else {
            // Full body
            exercises.push({ name: 'Prensa', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Remo en polea', targetSets: 3, targetReps: '10-12' });
            exercises.push({ name: 'Press plano mancuernas', targetSets: 3, targetReps: '10-12' });
        }

        const generatedExercises: GeneratedExercise[] = [];
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

    private getRepsForGoal(goal: string): string {
        switch (goal) {
            case 'strength': return '4-6';
            case 'gain_muscle': return '8-12';
            case 'lose_weight': return '12-15';
            default: return '10-12';
        }
    }
}
