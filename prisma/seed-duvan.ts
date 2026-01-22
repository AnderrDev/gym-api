import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Creating Duvan Garnica user and routine...');

    // 1. Create User
    const hashedPassword = await bcrypt.hash('Duvan123', 10); // Cambiar por la contraseña deseada
    const user = await prisma.user.upsert({
        where: { email: 'duvan.garnica@gmail.com' }, // Cambiar por el email real
        update: {},
        create: {
            email: 'duvan.garnica@gmail.com',
            password: hashedPassword,
            name: 'Duvan Garnica',
            age: 26,
            weight: 86,
            height: 172,
            goal: 'recomposition',
            experienceLevel: 'intermediate',
            trainingMonths: 12
        }
    });

    console.log('✅ User created:', user.email);

    // 2. Create Routine
    const routine = await prisma.workoutPlan.create({
        data: {
            userId: user.id,
            name: 'Rutina Recomposición 5 Días',
            description: 'Rutina enfocada en recomposición corporal con énfasis metabólico',
            daysPerWeek: 5,
            goal: 'recomposition',
            experienceLevel: 'intermediate'
        }
    });

    console.log('✅ Routine created:', routine.name);

    // Helper function to find exercise by name
    const findExercise = async (name: string) => {
        return await prisma.exercise.findFirst({
            where: { name: { contains: name, mode: 'insensitive' } }
        });
    };

    // 3. DÍA 1 – PUSH (Pecho + Hombro + Tríceps)
    const day1 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 1,
            name: 'PUSH (Pecho + Hombro + Tríceps)',
            focus: 'Pecho'
        }
    });

    const pressBanca = await findExercise('Press banca');
    const pressInclinado = await findExercise('Press inclinado');
    const pressHombro = await findExercise('Press');
    const elevacionLateral = await findExercise('Elevación lateral');
    const tricepsPolea = await findExercise('Tríceps');
    const fondos = await findExercise('Fondos');

    if (pressBanca) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressBanca.id, sets: 3, reps: '8-10', order: 1, defaultWeight: 45, restTime: 70 }
        });
    }
    if (pressInclinado) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressInclinado.id, sets: 3, reps: '10-12', order: 2, defaultWeight: 18, restTime: 70 }
        });
    }
    if (pressHombro) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressHombro.id, sets: 3, reps: '10-12', order: 3, defaultWeight: 16, restTime: 70 }
        });
    }
    if (elevacionLateral) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: elevacionLateral.id, sets: 3, reps: '15', order: 4, defaultWeight: 7, restTime: 60 }
        });
    }
    if (tricepsPolea) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: tricepsPolea.id, sets: 3, reps: '12-15', order: 5, defaultWeight: 25, restTime: 60 }
        });
    }
    if (fondos) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: fondos.id, sets: 2, reps: '10-12', order: 6, restTime: 60 }
        });
    }

    console.log('✅ Day 1 created');

    // 4. DÍA 2 – PULL (Espalda + Bíceps)
    const day2 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 2,
            name: 'PULL (Espalda + Bíceps)',
            focus: 'Espalda'
        }
    });

    const jalon = await findExercise('Jalón');
    const remoMaquina = await findExercise('Remo en máquina');
    const remoMancuerna = await findExercise('Remo');
    const facePull = await findExercise('Face pull');
    const curlBiceps = await findExercise('Curl');
    const curlMartillo = await findExercise('Curl martillo');

    if (jalon) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: jalon.id, sets: 3, reps: '10-12', order: 1, defaultWeight: 47, restTime: 70 }
        });
    }
    if (remoMaquina) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: remoMaquina.id, sets: 3, reps: '10-12', order: 2, defaultWeight: 47, restTime: 70 }
        });
    }
    if (remoMancuerna) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: remoMancuerna.id, sets: 3, reps: '12', order: 3, defaultWeight: 20, restTime: 70 }
        });
    }
    if (facePull) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: facePull.id, sets: 3, reps: '15-20', order: 4, defaultWeight: 20, restTime: 60 }
        });
    }
    if (curlBiceps) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: curlBiceps.id, sets: 3, reps: '12', order: 5, defaultWeight: 12, restTime: 60 }
        });
    }
    if (curlMartillo) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: curlMartillo.id, sets: 2, reps: '12-15', order: 6, defaultWeight: 14, restTime: 60 }
        });
    }

    console.log('✅ Day 2 created');

    // 5. DÍA 3 – PIERNA + CORE
    const day3 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 3,
            name: 'PIERNA + CORE',
            focus: 'Pierna'
        }
    });

    const prensa = await findExercise('Prensa');
    const sentadillaSmith = await findExercise('Sentadilla');
    const pesoMuerto = await findExercise('Peso muerto rumano');
    const curlFemoral = await findExercise('Curl femoral');
    const gemelos = await findExercise('Gemelos');
    const plancha = await findExercise('Plancha');

    if (prensa) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: prensa.id, sets: 3, reps: '12-15', order: 1, defaultWeight: 120, restTime: 85 }
        });
    }
    if (sentadillaSmith) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: sentadillaSmith.id, sets: 3, reps: '10-12', order: 2, defaultWeight: 40, restTime: 85 }
        });
    }
    if (pesoMuerto) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: pesoMuerto.id, sets: 3, reps: '10-12', order: 3, defaultWeight: 22, restTime: 85 }
        });
    }
    if (curlFemoral) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: curlFemoral.id, sets: 2, reps: '12-15', order: 4, defaultWeight: 35, restTime: 75 }
        });
    }
    if (gemelos) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: gemelos.id, sets: 3, reps: '15-20', order: 5, defaultWeight: 70, restTime: 75 }
        });
    }
    if (plancha) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: plancha.id, sets: 3, reps: '30-40s', order: 6, restTime: 60 }
        });
    }

    console.log('✅ Day 3 created');

    // 6. DÍA 4 – PUSH (Metabólico)
    const day4 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 4,
            name: 'PUSH Metabólico',
            focus: 'Pecho'
        }
    });

    const pressInclinadoMaquina = await findExercise('Press inclinado');
    const aperturas = await findExercise('Aperturas');
    const pressHombroMaquina = await findExercise('Press');
    const tricepsCuerda = await findExercise('Tríceps cuerda');

    if (pressInclinadoMaquina) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: pressInclinadoMaquina.id, sets: 3, reps: '12-15', order: 1, defaultWeight: 47, restTime: 55 }
        });
    }
    if (aperturas) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: aperturas.id, sets: 3, reps: '15', order: 2, defaultWeight: 12, restTime: 55 }
        });
    }
    if (pressHombroMaquina) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: pressHombroMaquina.id, sets: 3, reps: '12', order: 3, defaultWeight: 42, restTime: 55 }
        });
    }
    if (elevacionLateral) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: elevacionLateral.id, sets: 3, reps: '15-20', order: 4, defaultWeight: 7, restTime: 50 }
        });
    }
    if (tricepsCuerda) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: tricepsCuerda.id, sets: 3, reps: '15', order: 5, defaultWeight: 25, restTime: 50 }
        });
    }

    console.log('✅ Day 4 created');

    // 7. DÍA 5 – PULL (Metabólico)
    const day5 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 5,
            name: 'PULL Metabólico',
            focus: 'Espalda'
        }
    });

    const jalonNeutro = await findExercise('Jalón');
    const remoPolea = await findExercise('Remo en polea');
    const pullover = await findExercise('Pullover');
    const curlPolea = await findExercise('Curl en polea');
    const curlConcentrado = await findExercise('Curl');

    if (jalonNeutro) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: jalonNeutro.id, sets: 3, reps: '12-15', order: 1, defaultWeight: 42, restTime: 55 }
        });
    }
    if (remoPolea) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: remoPolea.id, sets: 3, reps: '12-15', order: 2, defaultWeight: 47, restTime: 55 }
        });
    }
    if (pullover) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: pullover.id, sets: 2, reps: '15-20', order: 3, defaultWeight: 25, restTime: 50 }
        });
    }
    if (facePull) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: facePull.id, sets: 2, reps: '20', order: 4, defaultWeight: 20, restTime: 50 }
        });
    }
    if (curlPolea) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: curlPolea.id, sets: 3, reps: '12-15', order: 5, defaultWeight: 25, restTime: 50 }
        });
    }
    if (curlConcentrado) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: curlConcentrado.id, sets: 2, reps: '12-15', order: 6, defaultWeight: 11, restTime: 50 }
        });
    }

    console.log('✅ Day 5 created');

    console.log('\n🎉 Duvan Garnica user and routine created successfully!');
    console.log(`Email: duvan.garnica@gmail.com`);
    console.log(`Password: Duvan123`);
    console.log(`\nNOTE: Day 6 is CARDIO (30-40 min walking/bike) - not tracked in app`);
    console.log(`Day 7 is REST`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
