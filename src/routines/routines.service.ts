import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoutinesService {
  constructor(private prisma: PrismaService) { }

  async create(createRoutineDto: CreateRoutineDto) {
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
