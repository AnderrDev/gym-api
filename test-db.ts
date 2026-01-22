import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const exercises = await prisma.exercise.findMany({ take: 5 });
    console.log('Exercises found:', JSON.stringify(exercises, null, 2));

    const users = await prisma.user.findMany({ take: 5 });
    console.log('Users found:', JSON.stringify(users, null, 2));

    const routines = await prisma.routine.findMany({ include: { user: true }, take: 5 });
    console.log('Routines found:', JSON.stringify(routines, null, 2));
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
