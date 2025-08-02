'use server';

import prisma from "@/db/prisma-client";

export async function findOneByIdAndUserId(id: string, userId: string) {
    return prisma.course.findFirst({
        where: {
            id, userId
        },
        include: {
            lessons: { select: { id: true, completed: true } }
        }
    });
}

export async function findManyByUserId(userId: string) {
    return prisma.course.findMany({ where: { userId } });
}

export async function _getContextDataForLessonGeneration(
    courseId: string,
    sectionId: string,
    lessonId: string,
    userId: string,
) {
    const course = await prisma.course.findFirst({ where: { id: courseId, userId } });
    if (!course) throw new Error('Course is not found');

    const section = course.sections.find(({ id }) => id === sectionId);
    if (!section) throw new Error('Section is not found');

    const lesson = section.lessons.find(({ id }) => id === lessonId);
    if (!lesson) throw new Error('Lesson is not found');

    return {
        // Course
        courseTitle: course.title,
        courseDescription: course.description,
        // Section
        sectionTitle: section.title,
        sectionDescription: section.description,
        // Lesson
        lessonTitle: lesson.title,
        lessonDescription: lesson.description,
    };
}


// Types
export type CourseData = NonNullable<Awaited<ReturnType<typeof findOneByIdAndUserId>>>
export type LessonContextForGeneration = Awaited<ReturnType<typeof _getContextDataForLessonGeneration>>