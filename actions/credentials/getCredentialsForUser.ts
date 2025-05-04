'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GetCredentialsForUser() {
    const { userId } = auth();
    if (!userId) {
        throw new Error('unauthenticated');
    }

    return await prisma.credentials.findMany({
        where: {
            userId,
        },
        orderBy: { name: 'asc' },
    });
}
