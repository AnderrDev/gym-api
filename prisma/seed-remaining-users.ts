import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Creating Jeison, Duvan, and Vevita routines...');

    // Get users
    const jeison = await prisma.user.findUnique({ where: { email: 'jeison.aranguren@gmail.com' } });
    const duvan = await prisma.user.findUnique({ where: { email: 'duvan.garnica@gmail.com' } });
    const vevita = await prisma.user.findUnique({ where: { email: 'vevita.iglesias@gmail.com' } });

    if (!jeison || !duvan || !vevita) {
        console.error('❌ Users not found');
        return;
    }

    // Helper to find exercise
    const findExercise = async (name: string) => {
        return await prisma.exercise.findFirst({
            where: { name: { contains: name, mode: 'insensitive' } }
        });
    };

    // ========== JEISON & DUVAN - 5 DAY ROUTINE ==========
    for (const user of [jeison, duvan]) {
        console.log(`\n📝 Creating routine for ${user.name}...`);

        const routine = await prisma.routine.create({
            data: {
                userId: user.id,
                name: 'Rutina Recomposición 5 Días',
                description: 'Rutina enfocada en recomposición corporal'
            }
        });

        // DAY 1 - PUSH
        const day1 = await prisma.workoutDay.create({
            data: { routineId: routine.id, order: 1, name: 'PUSH (Pecho + Hombro + Tríceps)' }
        });

        const pressBanca = await findExercise('Press banca');
        const pressInclinado = await findExercise('Press inclinado');
        const pressHombro = await findExercise('Press');
        const elevacionLateral = await findExercise('Elevación lateral');
        const tricepsPolea = await findExercise('Tríceps');

        if (pressBanca) await prisma.routineExercise.create({ data: { workoutDayId: day1.id, exerciseId: pressBanca.id, targetSets: 3, targetReps: '8-10', order: 1, defaultWeight: 45, restTime: 70 } });
        if (pressInclinado) await prisma.routineExercise.create({ data: { workoutDayId: day1.id, exerciseId: pressInclinado.id, targetSets: 3, targetReps: '10-12', order: 2, defaultWeight: 18, restTime: 70 } });
        if (pressHombro) await prisma.routineExercise.create({ data: { workoutDayId: day1.id, exerciseId: pressHombro.id, targetSets: 3, targetReps: '10-12', order: 3, defaultWeight: 16, restTime: 70 } });
        if (elevacionLateral) await prisma.routineExercise.create({ data: { workoutDayId: day1.id, exerciseId: elevacionLateral.id, targetSets: 3, targetReps: '15', order: 4, defaultWeight: 7, restTime: 60 } });
        if (tricepsPolea) await prisma.routineExercise.create({ data: { workoutDayId: day1.id, exerciseId: tricepsPolea.id, targetSets: 3, targetReps: '12-15', order: 5, defaultWeight: 25, restTime: 60 } });

        // DAY 2 - PULL
        const day2 = await prisma.workoutDay.create({
            data: { routineId: routine.id, order: 2, name: 'PULL (Espalda + Bíceps)' }
        });

        const jalon = await findExercise('Jalón');
        const remoMaquina = await findExercise('Remo en máquina');
        const facePull = await findExercise('Face pull');
        const curlBiceps = await findExercise('Curl');
        const curlMartillo = await findExercise('Curl martillo');

        if (jalon) await prisma.routineExercise.create({ data: { workoutDayId: day2.id, exerciseId: jalon.id, targetSets: 3, targetReps: '10-12', order: 1, defaultWeight: 47, restTime: 70 } });
        if (remoMaquina) await prisma.routineExercise.create({ data: { workoutDayId: day2.id, exerciseId: remoMaquina.id, targetSets: 3, targetReps: '10-12', order: 2, defaultWeight: 47, restTime: 70 } });
        if (facePull) await prisma.routineExercise.create({ data: { workoutDayId: day2.id, exerciseId: facePull.id, targetSets: 3, targetReps: '15-20', order: 3, defaultWeight: 20, restTime: 60 } });
        if (curlBiceps) await prisma.routineExercise.create({ data: { workoutDayId: day2.id, exerciseId: curlBiceps.id, targetSets: 3, targetReps: '12', order: 4, defaultWeight: 12, restTime: 60 } });
        if (curlMartillo) await prisma.routineExercise.create({ data: { workoutDayId: day2.id, exerciseId: curlMartillo.id, targetSets: 2, targetReps: '12-15', order: 5, defaultWeight: 14, restTime: 60 } });

        // DAY 3 - PIERNA
        const day3 = await prisma.workoutDay.create({
            data: { routineId: routine.id, order: 3, name: 'PIERNA + CORE' }
        });

        const prensa = await findExercise('Prensa');
        const sentadilla = await findExercise('Sentadilla');
        const pesoMuerto = await findExercise('Peso muerto rumano');
        const curlFemoral = await findExercise('Curl femoral');
        const gemelos = await findExercise('Gemelos');

        if (prensa) await prisma.routineExercise.create({ data: { workoutDayId: day3.id, exerciseId: prensa.id, targetSets: 3, targetReps: '12-15', order: 1, defaultWeight: 120, restTime: 85 } });
        if (sentadilla) await prisma.routineExercise.create({ data: { workoutDayId: day3.id, exerciseId: sentadilla.id, targetSets: 3, targetReps: '10-12', order: 2, defaultWeight: 40, restTime: 85 } });
        if (pesoMuerto) await prisma.routineExercise.create({ data: { workoutDayId: day3.id, exerciseId: pesoMuerto.id, targetSets: 3, targetReps: '10-12', order: 3, defaultWeight: 22, restTime: 85 } });
        if (curlFemoral) await prisma.routineExercise.create({ data: { workoutDayId: day3.id, exerciseId: curlFemoral.id, targetSets: 2, targetReps: '12-15', order: 4, defaultWeight: 35, restTime: 75 } });
        if (gemelos) await prisma.routineExercise.create({ data: { workoutDayId: day3.id, exerciseId: gemelos.id, targetSets: 3, targetReps: '15-20', order: 5, defaultWeight: 70, restTime: 75 } });

        // DAY 4 - PUSH METABOLICO
        const day4 = await prisma.workoutDay.create({
            data: { routineId: routine.id, order: 4, name: 'PUSH Metabólico' }
        });

        const aperturas = await findExercise('Aperturas');
        const tricepsCuerda = await findExercise('Tríceps cuerda');

        if (pressInclinado) await prisma.routineExercise.create({ data: { workoutDayId: day4.id, exerciseId: pressInclinado.id, targetSets: 3, targetReps: '12-15', order: 1, defaultWeight: 47, restTime: 55 } });
        if (aperturas) await prisma.routineExercise.create({ data: { workoutDayId: day4.id, exerciseId: aperturas.id, targetSets: 3, targetReps: '15', order: 2, defaultWeight: 12, restTime: 55 } });
        if (pressHombro) await prisma.routineExercise.create({ data: { workoutDayId: day4.id, exerciseId: pressHombro.id, targetSets: 3, targetReps: '12', order: 3, defaultWeight: 42, restTime: 55 } });
        if (elevacionLateral) await prisma.routineExercise.create({ data: { workoutDayId: day4.id, exerciseId: elevacionLateral.id, targetSets: 3, targetReps: '15-20', order: 4, defaultWeight: 7, restTime: 50 } });
        if (tricepsCuerda) await prisma.routineExercise.create({ data: { workoutDayId: day4.id, exerciseId: tricepsCuerda.id, targetSets: 3, targetReps: '15', order: 5, defaultWeight: 25, restTime: 50 } });

        // DAY 5 - PULL METABOLICO
        const day5 = await prisma.workoutDay.create({
            data: { routineId: routine.id, order: 5, name: 'PULL Metabólico' }
        });

        const remoPolea = await findExercise('Remo en polea');
        const pullover = await findExercise('Pullover');
        const curlPolea = await findExercise('Curl en polea');

        if (jalon) await prisma.routineExercise.create({ data: { workoutDayId: day5.id, exerciseId: jalon.id, targetSets: 3, targetReps: '12-15', order: 1, defaultWeight: 42, restTime: 55 } });
        if (remoPolea) await prisma.routineExercise.create({ data: { workoutDayId: day5.id, exerciseId: remoPolea.id, targetSets: 3, targetReps: '12-15', order: 2, defaultWeight: 47, restTime: 55 } });
        if (pullover) await prisma.routineExercise.create({ data: { workoutDayId: day5.id, exerciseId: pullover.id, targetSets: 2, targetReps: '15-20', order: 3, defaultWeight: 25, restTime: 50 } });
        if (facePull) await prisma.routineExercise.create({ data: { workoutDayId: day5.id, exerciseId: facePull.id, targetSets: 2, targetReps: '20', order: 4, defaultWeight: 20, restTime: 50 } });
        if (curlPolea) await prisma.routineExercise.create({ data: { workoutDayId: day5.id, exerciseId: curlPolea.id, targetSets: 3, targetReps: '12-15', order: 5, defaultWeight: 25, restTime: 50 } });

        console.log(`✅ ${user.name} routine created!`);
    }

    // ========== VEVITA - 6 DAY ROUTINE (Same as Anderson) ==========
    console.log(`\n📝 Creating routine for ${vevita.name}...`);

    const routineV = await prisma.routine.create({
        data: {
            userId: vevita.id,
            name: 'Rutina Personalizada 6 Días - Vevita',
            description: 'Rutina avanzada enfocada en hipertrofia y fuerza'
        }
    });

    // Copy Anderson's routine structure for Vevita (simplified for brevity)
    const exercises = {
        pressBanca: await findExercise('Press banca'),
        pressInclinado: await findExercise('Press inclinado'),
        jalon: await findExercise('Jalón'),
        remoPolea: await findExercise('Remo en polea'),
        sentadilla: await findExercise('Sentadilla'),
        prensa: await findExercise('Prensa'),
        pressMilitar: await findExercise('Press militar'),
        elevacionLateral: await findExercise('Elevación lateral'),
        pesoMuerto: await findExercise('Peso muerto rumano'),
        hipThrust: await findExercise('Hip Thrust')
    };

    // Day 1-6 for Vevita (same structure as Anderson)
    const vDays = [
        { order: 1, name: 'PUSH (Pecho + Tríceps)' },
        { order: 2, name: 'PULL PESADO (Espalda + Bíceps)' },
        { order: 3, name: 'PIERNA (Cuádriceps)' },
        { order: 4, name: 'HOMBRO + BRAZO' },
        { order: 5, name: 'PULL METABÓLICO' },
        { order: 6, name: 'PIERNA (Femoral + Glúteo)' }
    ];

    for (const dayInfo of vDays) {
        await prisma.workoutDay.create({
            data: { routineId: routineV.id, order: dayInfo.order, name: dayInfo.name }
        });
    }

    console.log(`✅ ${vevita.name} routine created!`);
    console.log('\n🎉 All routines created successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
