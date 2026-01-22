import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Creating user and custom routine...');

    // 1. Create User
    const hashedPassword = await bcrypt.hash('And101002', 10);
    const user = await prisma.user.upsert({
        where: { email: 'cifuentees224@gmail.com' },
        update: {},
        create: {
            email: 'cifuentees224@gmail.com',
            password: hashedPassword,
            name: 'Anderson Pulido',
            age: 25,
            weight: 80,
            height: 175,
            goal: 'gain_muscle',
            experienceLevel: 'advanced',
            trainingMonths: 24
        }
    });

    console.log('✅ User created:', user.email);

    // 2. Create Routine
    const routine = await prisma.workoutPlan.create({
        data: {
            userId: user.id,
            name: 'Rutina Personalizada 6 Días',
            description: 'Rutina avanzada enfocada en hipertrofia y fuerza',
            daysPerWeek: 6,
            goal: 'gain_muscle',
            experienceLevel: 'advanced'
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
            workoutPlanId: routine.id,
            dayNumber: 1,
            name: 'PUSH (Pecho + Tríceps)',
            focus: 'Pecho'
        }
    });

    const pressBanca = await findExercise('Press banca');
    const pressInclinado = await findExercise('Press inclinado');
    const aperturas = await findExercise('Aperturas');
    const pressMilitar = await findExercise('Press militar');
    const tricepsPolea = await findExercise('Tríceps');
    const pressFrances = await findExercise('Press francés');

    if (pressBanca) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressBanca.id, sets: 3, reps: '4-8', order: 1, defaultWeight: 90 }
        });
    }
    if (pressInclinado) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressInclinado.id, sets: 3, reps: '8-10', order: 2, defaultWeight: 32 }
        });
    }
    if (aperturas) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: aperturas.id, sets: 3, reps: '12-15', order: 3 }
        });
    }
    if (pressMilitar) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressMilitar.id, sets: 3, reps: '6-8', order: 4, defaultWeight: 55 }
        });
    }
    if (tricepsPolea) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: tricepsPolea.id, sets: 3, reps: '12-15', order: 5 }
        });
    }
    if (pressFrances) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day1.id, exerciseId: pressFrances.id, sets: 3, reps: '10-12', order: 6, defaultWeight: 32 }
        });
    }

    console.log('✅ Day 1 created');

    // 4. DÍA 2 – PULL PESADO (Espalda + Bíceps)
    const day2 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 2,
            name: 'PULL PESADO (Espalda + Bíceps)',
            focus: 'Espalda'
        }
    });

    const jalon = await findExercise('Jalón');
    const remoBarra = await findExercise('Remo con barra');
    const jalonCerrado = await findExercise('Jalón');
    const remoPolea = await findExercise('Remo en polea');
    const facePull = await findExercise('Face pull');
    const curlBarra = await findExercise('Curl bíceps barra');
    const curlInclinado = await findExercise('Curl inclinado');
    const curlMartillo = await findExercise('Curl martillo');

    if (jalon) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: jalon.id, sets: 4, reps: '6-8', order: 1 }
        });
    }
    if (remoBarra) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: remoBarra.id, sets: 4, reps: '6-8', order: 2, defaultWeight: 85 }
        });
    }
    if (remoPolea) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: remoPolea.id, sets: 3, reps: '12', order: 3 }
        });
    }
    if (facePull) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: facePull.id, sets: 3, reps: '15-20', order: 4 }
        });
    }
    if (curlBarra) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: curlBarra.id, sets: 3, reps: '6-8', order: 5, defaultWeight: 37 }
        });
    }
    if (curlInclinado) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: curlInclinado.id, sets: 3, reps: '10-12', order: 6, defaultWeight: 16 }
        });
    }
    if (curlMartillo) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day2.id, exerciseId: curlMartillo.id, sets: 2, reps: '12-15', order: 7, defaultWeight: 20 }
        });
    }

    console.log('✅ Day 2 created');

    // 5. DÍA 3 – PIERNA (Cuádriceps)
    const day3 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 3,
            name: 'PIERNA (Cuádriceps)',
            focus: 'Pierna'
        }
    });

    const sentadilla = await findExercise('Sentadilla libre');
    const prensa = await findExercise('Prensa');
    const hackSquat = await findExercise('Hack squat');
    const zancadas = await findExercise('Zancadas');
    const extensiones = await findExercise('Extensiones');
    const gemelos = await findExercise('Gemelos de pie');

    if (sentadilla) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: sentadilla.id, sets: 4, reps: '4-8', order: 1, defaultWeight: 125 }
        });
    }
    if (prensa) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: prensa.id, sets: 4, reps: '10-12', order: 2 }
        });
    }
    if (hackSquat) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: hackSquat.id, sets: 3, reps: '8-10', order: 3 }
        });
    }
    if (zancadas) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: zancadas.id, sets: 3, reps: '10-12', order: 4, defaultWeight: 25 }
        });
    }
    if (extensiones) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: extensiones.id, sets: 2, reps: '12-15', order: 5 }
        });
    }
    if (gemelos) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day3.id, exerciseId: gemelos.id, sets: 4, reps: '12-15', order: 6 }
        });
    }

    console.log('✅ Day 3 created');

    // 6. DÍA 4 – HOMBRO + BRAZO
    const day4 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 4,
            name: 'HOMBRO + BRAZO',
            focus: 'Hombro'
        }
    });

    const elevacionLateral = await findExercise('Elevación lateral');
    const reverseFly = await findExercise('Reverse fly');
    const curlPolea = await findExercise('Curl en polea');
    const tricepsCuerda = await findExercise('Tríceps cuerda');

    if (pressMilitar) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: pressMilitar.id, sets: 4, reps: '6-8', order: 1, defaultWeight: 52 }
        });
    }
    if (elevacionLateral) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: elevacionLateral.id, sets: 7, reps: '12-20', order: 2, defaultWeight: 10 }
        });
    }
    if (reverseFly) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: reverseFly.id, sets: 3, reps: '12-15', order: 3 }
        });
    }
    if (facePull) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: facePull.id, sets: 2, reps: '15-20', order: 4 }
        });
    }
    if (curlPolea) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: curlPolea.id, sets: 3, reps: '12-15', order: 5 }
        });
    }
    if (tricepsCuerda) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day4.id, exerciseId: tricepsCuerda.id, sets: 3, reps: '12-15', order: 6 }
        });
    }

    console.log('✅ Day 4 created');

    // 7. DÍA 5 – PULL METABÓLICO
    const day5 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 5,
            name: 'PULL METABÓLICO',
            focus: 'Espalda'
        }
    });

    const jalonNeutro = await findExercise('Jalón');
    const remoMaquina = await findExercise('Remo en máquina');

    if (jalonNeutro) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: jalonNeutro.id, sets: 4, reps: '12-15', order: 1 }
        });
    }
    if (remoMaquina) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: remoMaquina.id, sets: 4, reps: '12-15', order: 2 }
        });
    }
    if (remoPolea) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: remoPolea.id, sets: 3, reps: '12-15', order: 3 }
        });
    }
    if (reverseFly) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: reverseFly.id, sets: 2, reps: '15-20', order: 4 }
        });
    }
    if (curlPolea) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: curlPolea.id, sets: 3, reps: '12-15', order: 5 }
        });
    }
    if (curlInclinado) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: curlInclinado.id, sets: 2, reps: '12-15', order: 6, defaultWeight: 16 }
        });
    }
    if (curlMartillo) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: curlMartillo.id, sets: 2, reps: '12-15', order: 7, defaultWeight: 20 }
        });
    }
    if (facePull) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day5.id, exerciseId: facePull.id, sets: 2, reps: '15-20', order: 8 }
        });
    }

    console.log('✅ Day 5 created');

    // 8. DÍA 6 – PIERNA (Femoral + Glúteo)
    const day6 = await prisma.workoutDay.create({
        data: {
            workoutPlanId: routine.id,
            dayNumber: 6,
            name: 'PIERNA (Femoral + Glúteo)',
            focus: 'Pierna'
        }
    });

    const pesoMuerto = await findExercise('Peso muerto rumano');
    const hipThrust = await findExercise('Hip Thrust');
    const curlFemoral = await findExercise('Curl femoral');
    const backExtension = await findExercise('Back extension');
    const sentadillaBulgara = await findExercise('Sentadilla búlgara');
    const gemeloSentado = await findExercise('Gemelo sentado');

    if (pesoMuerto) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day6.id, exerciseId: pesoMuerto.id, sets: 3, reps: '5-8', order: 1, defaultWeight: 130 }
        });
    }
    if (hipThrust) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day6.id, exerciseId: hipThrust.id, sets: 4, reps: '8-10', order: 2, defaultWeight: 130 }
        });
    }
    if (curlFemoral) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day6.id, exerciseId: curlFemoral.id, sets: 4, reps: '10-12', order: 3 }
        });
    }
    if (backExtension) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day6.id, exerciseId: backExtension.id, sets: 3, reps: '12-15', order: 4 }
        });
    }
    if (sentadillaBulgara) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day6.id, exerciseId: sentadillaBulgara.id, sets: 3, reps: '10-12', order: 5, defaultWeight: 23 }
        });
    }
    if (gemeloSentado) {
        await prisma.workoutExercise.create({
            data: { workoutDayId: day6.id, exerciseId: gemeloSentado.id, sets: 4, reps: '12-15', order: 6 }
        });
    }

    console.log('✅ Day 6 created');

    console.log('\n🎉 User and routine created successfully!');
    console.log(`Email: cifuentees224@gmail.com`);
    console.log(`Password: And101002`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
