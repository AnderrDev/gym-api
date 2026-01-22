"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Cleaning database...');
    await prisma.setLog.deleteMany();
    await prisma.workoutSession.deleteMany();
    await prisma.routineExercise.deleteMany();
    await prisma.workoutDay.deleteMany();
    await prisma.routine.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.user.deleteMany();
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const user = await prisma.user.upsert({
        where: { email: 'user@test.com' },
        update: {
            password: hashedPassword,
        },
        create: {
            email: 'user@test.com',
            name: 'Test Warrior',
            password: hashedPassword,
            age: 28,
            height: 180,
            weight: 82,
        },
    });
    console.log('User created:', user.email);
    const routine = await prisma.routine.create({
        data: {
            name: 'Rutina de 7 Días - Definición y Masa Muscular',
            description: 'Enfoque en Push/Pull/Legs y metabólico para maximizar el desarrollo muscular.',
            userId: user.id,
        },
    });
    console.log('Routine created:', routine.name);
    const daysData = [
        {
            name: 'PUSH (Pecho, Hombro, Tríceps)',
            order: 1,
            exercises: [
                { name: 'Press banca barra', targetSets: 4, targetReps: '6–8', muscleGroup: 'Pecho' },
                { name: 'Press inclinado mancuernas', targetSets: 4, targetReps: '8–10', muscleGroup: 'Pecho' },
                { name: 'Press plano mancuernas o máquina pecho', targetSets: 3, targetReps: '10–12', muscleGroup: 'Pecho' },
                { name: 'Aperturas en polea (alto → bajo)', targetSets: 3, targetReps: '12–15', muscleGroup: 'Pecho' },
                { name: 'Press militar barra o mancuernas', targetSets: 3, targetReps: '6–8', muscleGroup: 'Hombro' },
                { name: 'Extensión tríceps en polea', targetSets: 3, targetReps: '12–15', muscleGroup: 'Tríceps' },
                { name: 'Press francés barra EZ', targetSets: 3, targetReps: '10–12', muscleGroup: 'Tríceps' },
            ],
        },
        {
            name: 'PULL PESADO (Espalda, Bíceps)',
            order: 2,
            exercises: [
                { name: 'Jalón al pecho', targetSets: 4, targetReps: '6–8', muscleGroup: 'Espalda' },
                { name: 'Remo con barra', targetSets: 4, targetReps: '6–8', muscleGroup: 'Espalda' },
                { name: 'Jalón cerrado', targetSets: 3, targetReps: '10–12', muscleGroup: 'Espalda' },
                { name: 'Remo en polea', targetSets: 3, targetReps: '12', muscleGroup: 'Espalda' },
                { name: 'Face pulls', targetSets: 3, targetReps: '15–20', muscleGroup: 'Hombro Posterior' },
                { name: 'Curl bíceps barra', targetSets: 3, targetReps: '8–10', muscleGroup: 'Bíceps' },
                { name: 'Curl martillo', targetSets: 3, targetReps: '12', muscleGroup: 'Bíceps' },
                { name: 'Pullover polea (finisher) ⭐', targetSets: 1, targetReps: '20', muscleGroup: 'Espalda' },
            ],
        },
        {
            name: 'PIERNA (Cuádriceps dominante)',
            order: 3,
            exercises: [
                { name: 'Sentadilla libre', targetSets: 4, targetReps: '6–8', muscleGroup: 'Pierna' },
                { name: 'Prensa inclinada pies bajos', targetSets: 4, targetReps: '10–12', muscleGroup: 'Pierna' },
                { name: 'Hack squat', targetSets: 3, targetReps: '8–10', muscleGroup: 'Pierna' },
                { name: 'Zancadas caminando', targetSets: 3, targetReps: '10–12 c/pierna', muscleGroup: 'Pierna' },
                { name: 'Extensiones + drop', targetSets: 3, targetReps: '12–15 + drop', muscleGroup: 'Pierna' },
                { name: 'Gemelos de pie', targetSets: 4, targetReps: '12–15', muscleGroup: 'Pierna' },
            ],
        },
        {
            name: 'HOMBRO + ABDOMEN',
            order: 4,
            exercises: [
                { name: 'Press militar', targetSets: 4, targetReps: '6–8', muscleGroup: 'Hombro' },
                { name: 'Elevación lateral en polea', targetSets: 4, targetReps: '12–15', muscleGroup: 'Hombro' },
                { name: 'Elevación lateral mancuerna', targetSets: 3, targetReps: '15–20', muscleGroup: 'Hombro' },
                { name: 'Reverse fly máquina/polea', targetSets: 3, targetReps: '12–15', muscleGroup: 'Hombro Posterior' },
                { name: 'Face pull', targetSets: 3, targetReps: '15–20', muscleGroup: 'Hombro Posterior' },
                { name: 'Crunch en polea', targetSets: 3, targetReps: '12–15', muscleGroup: 'Abdomen' },
                { name: 'Elevación de piernas', targetSets: 3, targetReps: '10–15', muscleGroup: 'Abdomen' },
                { name: 'Plancha RKC', targetSets: 2, targetReps: '20–30 seg', muscleGroup: 'Abdomen' },
            ],
        },
        {
            name: 'PULL METABÓLICO (Espalda + Brazos)',
            order: 5,
            exercises: [
                { name: 'Jalón en polea agarre neutro estrecho', targetSets: 4, targetReps: '12–15', muscleGroup: 'Espalda' },
                { name: 'Remo en máquina pecho soportado', targetSets: 4, targetReps: '12–15', muscleGroup: 'Espalda' },
                { name: 'Remo en polea baja (agarre V o neutro)', targetSets: 3, targetReps: '12–15', muscleGroup: 'Espalda' },
                { name: 'Reverse fly en máquina o polea', targetSets: 3, targetReps: '15–20', muscleGroup: 'Espalda/Hombro' },
                { name: 'Curl en polea de pie (tensión constante)', targetSets: 3, targetReps: '12–15', muscleGroup: 'Bíceps' },
                { name: 'Curl inclinado mancuernas', targetSets: 3, targetReps: '12–15', muscleGroup: 'Bíceps' },
                { name: 'Curl martillo o rope hammer', targetSets: 2, targetReps: '12–15', muscleGroup: 'Bíceps' },
                { name: 'Face pulls moderados', targetSets: 2, targetReps: '15–20', muscleGroup: 'Hombro' },
            ],
        },
        {
            name: 'PIERNA (Femoral + Glúteo)',
            order: 6,
            exercises: [
                { name: 'Peso muerto rumano', targetSets: 4, targetReps: '6–8', muscleGroup: 'Pierna' },
                { name: 'Hip Thrust con barra', targetSets: 4, targetReps: '8–10', muscleGroup: 'Glúteo' },
                { name: 'Curl femoral acostado o sentado', targetSets: 4, targetReps: '10–12', muscleGroup: 'Pierna' },
                { name: 'Back extension (45° o horizontal)', targetSets: 3, targetReps: '12–15', muscleGroup: 'Espalda Baja' },
                { name: 'Sentadilla búlgara mancuernas', targetSets: 3, targetReps: '10–12 por pierna', muscleGroup: 'Pierna' },
                { name: 'Gemelo sentado o en máquina', targetSets: 4, targetReps: '12–15', muscleGroup: 'Pierna' },
            ],
        },
        {
            name: 'FULL BODY METABÓLICO + CORE',
            order: 7,
            exercises: [
                { name: 'Sentadilla Hack', targetSets: 3, targetReps: '15–20', muscleGroup: 'Pierna' },
                { name: 'Press inclinado mancuernas ', targetSets: 3, targetReps: '12–15', muscleGroup: 'Pecho' },
                { name: 'Remo en polea baja ', targetSets: 3, targetReps: '12–15', muscleGroup: 'Espalda' },
                { name: 'Elevaciones laterales', targetSets: 3, targetReps: '15–20', muscleGroup: 'Hombro' },
                { name: 'Curl en polea', targetSets: 2, targetReps: '12–15', muscleGroup: 'Bíceps' },
                { name: 'Tríceps cuerda', targetSets: 2, targetReps: '12–15', muscleGroup: 'Tríceps' },
            ],
        },
    ];
    for (const day of daysData) {
        const workoutDay = await prisma.workoutDay.create({
            data: {
                name: day.name,
                order: day.order,
                routineId: routine.id,
            },
        });
        for (let i = 0; i < day.exercises.length; i++) {
            const exData = day.exercises[i];
            const exercise = await prisma.exercise.create({
                data: {
                    name: exData.name,
                    muscleGroup: exData.muscleGroup,
                },
            });
            await prisma.routineExercise.create({
                data: {
                    workoutDayId: workoutDay.id,
                    exerciseId: exercise.id,
                    targetSets: exData.targetSets,
                    targetReps: exData.targetReps,
                    order: i + 1,
                },
            });
        }
    }
    console.log('Days and exercises created.');
    const days = await prisma.workoutDay.findMany({
        where: { routineId: routine.id },
        include: { routineExercises: { include: { exercise: true } } },
        orderBy: { order: 'asc' }
    });
    console.log('Simulating workout history...');
    for (let i = 7; i > 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayToSync = days[(7 - i) % days.length];
        const session = await prisma.workoutSession.create({
            data: {
                userId: user.id,
                workoutDayId: dayToSync.id,
                date: date,
            }
        });
        for (const re of dayToSync.routineExercises) {
            const baseWeight = 20 + (Math.random() * 40);
            const progression = (7 - i) * 2;
            for (let setIdx = 1; setIdx <= re.targetSets; setIdx++) {
                await prisma.setLog.create({
                    data: {
                        workoutSessionId: session.id,
                        exerciseId: re.exerciseId,
                        setNumber: setIdx,
                        weight: Math.round(baseWeight + progression),
                        reps: 8 + Math.floor(Math.random() * 4),
                        isCompleted: true
                    }
                });
            }
        }
    }
    console.log('Seeding completed successfully! Use user@test.com / testpassword to login.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map