'use server';

import prisma from "@/db/prisma-client";
import { Lesson } from "@/generated/prisma";

export async function findOneByIdAndUserId(id: string, userId: string) {
    return prisma.lesson.findFirst({ where: { id, userId }});
}

export async function lessonExistsByIdAndUserId(id: string, userId: string) {
    return prisma.lesson.findFirst({
        select: { id: true },
        where: { id, userId },
    });
}

export async function submitLessonAnswers(
    id: string,
    userId: string,
    answerMap: Record<string, number>
) {
    const lesson = await findOneByIdAndUserId(id, userId);
    if (!lesson) throw new Error ('Invalid lesson');

    lesson.quiz = lesson.quiz.map((q) => ({
        ...q,
        userAnswerIdx: answerMap[q.id] || -1
    }));

    await prisma.lesson.update({
        data: {
            completed: true,
            quiz: lesson.quiz
        },
        where: { id, userId, }
    });
}


// Helper functions


export async function _createLesson(data: Lesson) {
    return prisma.lesson.create({ data });
}