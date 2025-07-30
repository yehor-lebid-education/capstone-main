'use server';

import prisma from "@/db/prisma-client";

export async function findOneByIdAndUserId(id: string, userId: string) {
    return prisma.course.findFirst({ where: { id, userId } });
}

export async function findManyByUserId(userId: string) {
    return prisma.course.findMany({ where: { userId } });
}
