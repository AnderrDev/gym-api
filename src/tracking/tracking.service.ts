import { Injectable } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) { }

  async create(createTrackingDto: CreateTrackingDto) {
    const { userId, workoutDayId, setLogs } = createTrackingDto;

    // Buscar si ya existe una sesión para este usuario y este día hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const existingSession = await this.prisma.workoutSession.findFirst({
      where: {
        userId,
        workoutDayId,
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        setLogs: true,
      },
    });

    if (existingSession) {
      // Si existe, eliminamos los logs anteriores para ese día y creamos los nuevos
      // (asumimos que el frontend envía el estado completo actualizado)
      await this.prisma.setLog.deleteMany({
        where: { workoutSessionId: existingSession.id },
      });

      return this.prisma.workoutSession.update({
        where: { id: existingSession.id },
        data: {
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
          orderBy: {
            setNumber: 'asc',
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  findByUser(userId: string) {
    return this.prisma.workoutSession.findMany({
      where: { userId },
      include: {
        workoutDay: true,
        setLogs: {
          include: {
            exercise: true,
          },
          orderBy: {
            setNumber: 'asc',
          },
        },
      },
      orderBy: {
        date: 'desc',
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
