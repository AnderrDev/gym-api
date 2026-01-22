import { Injectable } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) { }

  create(createTrackingDto: CreateTrackingDto) {
    const { userId, workoutDayId, setLogs } = createTrackingDto;

    return this.prisma.workoutSession.create({
      data: {
        userId,
        workoutDayId,
        setLogs: {
          create: setLogs.map((log) => ({
            exerciseId: log.exerciseId,
            setNumber: log.setNumber,
            weight: log.weight,
            reps: log.reps,
            isCompleted: log.isCompleted ?? true,
          })),
        },
      },
      include: {
        setLogs: true,
      },
    });
  }

  findAll() {
    return this.prisma.workoutSession.findMany({
      include: {
        user: true,
        workoutDay: true,
        setLogs: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.workoutSession.findUnique({
      where: { id },
      include: {
        user: true,
        workoutDay: true,
        setLogs: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  // Método específico para obtener estadísticas de un ejercicio por usuario
  getExerciseStats(userId: string, exerciseId: string) {
    return this.prisma.setLog.findMany({
      where: {
        exerciseId,
        workoutSession: {
          userId,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        workoutSession: true,
      },
    });
  }

  update(id: string, updateTrackingDto: UpdateTrackingDto) {
    // Implementación limitada para actualización de sesión
    return this.prisma.workoutSession.update({
      where: { id },
      data: {}, // Podría añadir notas o fecha
    });
  }

  remove(id: string) {
    return this.prisma.workoutSession.delete({
      where: { id },
    });
  }
}
