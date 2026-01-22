import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoutinesService {
  constructor(private prisma: PrismaService) { }

  async create(createRoutineDto: CreateRoutineDto) {
    const { name, description, userId, days } = createRoutineDto;

    // Eliminar rutinas anteriores para garantizar una única rutina por usuario
    await this.prisma.routine.deleteMany({
      where: { userId },
    });

    // Validar que todos los ejercicios existen antes de crear la rutina
    if (days) {
      for (const day of days) {
        if (day.exercises) {
          for (const ex of day.exercises) {
            const exerciseExists = await this.prisma.exercise.findUnique({
              where: { id: ex.exerciseId },
            });
            if (!exerciseExists) {
              throw new Error(`Exercise with ID ${ex.exerciseId} not found`);
            }
          }
        }
      }
    }

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

  findByUserId(userId: string) {
    return this.prisma.routine.findMany({
      where: { userId },
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

  findOne(id: string) {
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

  update(id: string, updateRoutineDto: UpdateRoutineDto) {
    // Implementación simplificada para actualización
    return this.prisma.routine.update({
      where: { id },
      data: {
        name: updateRoutineDto.name,
        description: updateRoutineDto.description,
      },
    });
  }

  remove(id: string) {
    // Por simplicidad en esta fase, asumo cascada o manejo manual si es necesario
    return this.prisma.routine.delete({
      where: { id },
    });
  }
}
