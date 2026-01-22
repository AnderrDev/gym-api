import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Creating Anderson Pulido user and custom routine...');

    // El usuario ya existe, solo obtenemos su ID
    const user = await prisma.user.findUnique({
        where: { email: 'cifuentees224@gmail.com' }
    });

    if (!user) {
        console.error('❌ User not found. Please create the user first.');
        return;
    }

    console.log('✅ User found:', user.email);

    // 2. Create Routine
    const routine = await prisma.routine.create({
        data: {
            userId: user.id,
            name: 'Rutina Personalizada 6 Días - Anderson',
            description: 'Rutina avanzada enfocada en hipertrofia y fuerza'
        }
    });

    console.log('✅ Routine created:', routine.name);

    // Helper function to find exercise by name
    const findExercise = async (name: string) => {
        return await prisma.exercise.findFirst({
            where: { name: { contains: name, mode: 'insensitive' } }
        });
    };

    // 3. DÍA 1 – PUSH (Pecho + Tríceps)
    const day1 = await prisma.workoutDay.create({
        data: {
            routineId: routine.id,
            order: 1,
            name: 'PUSH (Pecho + Tríceps)'
        }
    });

    const pressBanca = await findExercise('Press banca');
    const pressInclinado = await findExercise('Press inclinado');
    const aperturas = await findExercise('Aperturas');
    const pressMilitar = await findExercise('Press militar');
    const tricepsPolea = await findExercise('Tríceps');

    if (pressBanca) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressBanca.id, targetSets: 3, targetReps: '4-8', order: 1, defaultWeight: 90 }
        });
    }
    if (pressInclinado) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressInclinado.id, targetSets: 3, targetReps: '8-10', order: 2, defaultWeight: 32 }
        });
    }
    if (aperturas) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day1.id, exerciseId: aperturas.id, targetSets: 3, targetReps: '12-15', order: 3 }
        });
    }
    if (pressMilitar) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressMilitar.id, targetSets: 3, targetReps: '6-8', order: 4, defaultWeight: 55 }
        });
    }
    if (tricepsPolea) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day1.id, exerciseId: tricepsPolea.id, targetSets: 3, targetReps: '12-15', order: 5 }
        });
    }

    console.log('✅ Day 1 created');

    // 4. DÍA 2 – PULL PESADO (Espalda + Bíceps)
    const day2 = await prisma.workoutDay.create({
        data: {
            routineId: routine.id,
            order: 2,
            name: 'PULL PESADO (Espalda + Bíceps)'
        }
    });

    const jalon = await findExercise('Jalón');
    const remoPolea = await findExercise('Remo en polea');
    const facePull = await findExercise('Face pull');
    const curlBarra = await findExercise('Curl bíceps barra');
    const curlInclinado = await findExercise('Curl inclinado');
    const curlMartillo = await findExercise('Curl martillo');

    if (jalon) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day2.id, exerciseId: jalon.id, targetSets: 4, targetReps: '6-8', order: 1 }
        });
    }
    if (remoPolea) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day2.id, exerciseId: remoPolea.id, targetSets: 3, targetReps: '12', order: 2 }
        });
    }
    if (facePull) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day2.id, exerciseId: facePull.id, targetSets: 3, targetReps: '15-20', order: 3 }
        });
    }
    if (curlBarra) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day2.id, exerciseId: curlBarra.id, targetSets: 3, targetReps: '6-8', order: 4, defaultWeight: 37 }
        });
    }
    if (curlInclinado) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day2.id, exerciseId: curlInclinado.id, targetSets: 3, targetReps: '10-12', order: 5, defaultWeight: 16 }
        });
    }
    if (curlMartillo) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day2.id, exerciseId: curlMartillo.id, targetSets: 2, targetReps: '12-15', order: 6, defaultWeight: 20 }
        });
    }

    console.log('✅ Day 2 created');

    // 5. DÍA 3 – PIERNA (Cuádriceps)
    const day3 = await prisma.workoutDay.create({
        data: {
            routineId: routine.id,
            order: 3,
            name: 'PIERNA (Cuádriceps)'
        }
    });

    const sentadilla = await findExercise('Sentadilla');
    const prensa = await findExercise('Prensa');
    const hackSquat = await findExercise('Hack squat');
    const zancadas = await findExercise('Zancadas');
    const extensiones = await findExercise('Extensiones');
    const gemelos = await findExercise('Gemelos');

    if (sentadilla) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day3.id, exerciseId: sentadilla.id, targetSets: 4, targetReps: '4-8', order: 1, defaultWeight: 125 }
        });
    }
    if (prensa) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day3.id, exerciseId: prensa.id, targetSets: 4, targetReps: '10-12', order: 2 }
        });
    }
    if (hackSquat) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day3.id, exerciseId: hackSquat.id, targetSets: 3, targetReps: '8-10', order: 3 }
        });
    }
    if (zancadas) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day3.id, exerciseId: zancadas.id, targetSets: 3, targetReps: '10-12', order: 4, defaultWeight: 25 }
        });
    }
    if (extensiones) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day3.id, exerciseId: extensiones.id, targetSets: 2, targetReps: '12-15', order: 5 }
        });
    }
    if (gemelos) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day3.id, exerciseId: gemelos.id, targetSets: 4, targetReps: '12-15', order: 6 }
        });
    }

    console.log('✅ Day 3 created');

    // 6. DÍA 4 – HOMBRO + BRAZO
    const day4 = await prisma.workoutDay.create({
        data: {
            routineId: routine.id,
            order: 4,
            name: 'HOMBRO + BRAZO'
        }
    });

    const elevacionLateral = await findExercise('Elevación lateral');
    const reverseFly = await findExercise('Reverse fly');
    const curlPolea = await findExercise('Curl en polea');
    const tricepsCuerda = await findExercise('Tríceps cuerda');

    if (pressMilitar) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day4.id, exerciseId: pressMilitar.id, targetSets: 4, targetReps: '6-8', order: 1, defaultWeight: 52 }
        });
    }
    if (elevacionLateral) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day4.id, exerciseId: elevacionLateral.id, targetSets: 7, targetReps: '12-20', order: 2, defaultWeight: 10 }
        });
    }
    if (reverseFly) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day4.id, exerciseId: reverseFly.id, targetSets: 3, targetReps: '12-15', order: 3 }
        });
    }
    if (facePull) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day4.id, exerciseId: facePull.id, targetSets: 2, targetReps: '15-20', order: 4 }
        });
    }
    if (curlPolea) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day4.id, exerciseId: curlPolea.id, targetSets: 3, targetReps: '12-15', order: 5 }
        });
    }
    if (tricepsCuerda) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day4.id, exerciseId: tricepsCuerda.id, targetSets: 3, targetReps: '12-15', order: 6 }
        });
    }

    console.log('✅ Day 4 created');

    // 7. DÍA 5 – PULL METABÓLICO
    const day5 = await prisma.workoutDay.create({
        data: {
            routineId: routine.id,
            order: 5,
            name: 'PULL METABÓLICO'
        }
    });

    const remoMaquina = await findExercise('Remo en máquina');

    if (jalon) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day5.id, exerciseId: jalon.id, targetSets: 4, targetReps: '12-15', order: 1 }
        });
    }
    if (remoMaquina) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day5.id, exerciseId: remoMaquina.id, targetSets: 4, targetReps: '12-15', order: 2 }
        });
    }
    if (remoPolea) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day5.id, exerciseId: remoPolea.id, targetSets: 3, targetReps: '12-15', order: 3 }
        });
    }
    if (curlPolea) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day5.id, exerciseId: curlPolea.id, targetSets: 3, targetReps: '12-15', order: 4 }
        });
    }
    if (curlInclinado) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day5.id, exerciseId: curlInclinado.id, targetSets: 2, targetReps: '12-15', order: 5, defaultWeight: 16 }
        });
    }
    if (curlMartillo) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day5.id, exerciseId: curlMartillo.id, targetSets: 2, targetReps: '12-15', order: 6, defaultWeight: 20 }
        });
    }

    console.log('✅ Day 5 created');

    // 8. DÍA 6 – PIERNA (Femoral + Glúteo)
    const day6 = await prisma.workoutDay.create({
        data: {
            routineId: routine.id,
            order: 6,
            name: 'PIERNA (Femoral + Glúteo)'
        }
    });

    const pesoMuerto = await findExercise('Peso muerto rumano');
    const hipThrust = await findExercise('Hip Thrust');
    const curlFemoral = await findExercise('Curl femoral');
    const backExtension = await findExercise('Back extension');
    const sentadillaBulgara = await findExercise('Sentadilla búlgara');
    const gemeloSentado = await findExercise('Gemelo sentado');

    if (pesoMuerto) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day6.id, exerciseId: pesoMuerto.id, targetSets: 3, targetReps: '5-8', order: 1, defaultWeight: 130 }
        });
    }
    if (hipThrust) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day6.id, exerciseId: hipThrust.id, targetSets: 4, targetReps: '8-10', order: 2, defaultWeight: 130 }
        });
    }
    if (curlFemoral) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day6.id, exerciseId: curlFemoral.id, targetSets: 4, targetReps: '10-12', order: 3 }
        });
    }
    if (backExtension) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day6.id, exerciseId: backExtension.id, targetSets: 3, targetReps: '12-15', order: 4 }
        });
    }
    if (sentadillaBulgara) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day6.id, exerciseId: sentadillaBulgara.id, targetSets: 3, targetReps: '10-12', order: 5, defaultWeight: 23 }
        });
    }
    if (gemeloSentado) {
        await prisma.routineExercise.create({
            data: { workoutDayId: day6.id, exerciseId: gemeloSentado.id, targetSets: 4, targetReps: '12-15', order: 6 }
        });
    }

    console.log('✅ Day 6 created');

    console.log('\n🎉 Anderson routine created successfully!');
    console.log(`Email: cifuentees224@gmail.com`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
