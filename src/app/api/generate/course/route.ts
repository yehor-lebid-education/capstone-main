import { z } from "zod";
import { v4 as uuidV4 } from 'uuid';
import { NextRequest, NextResponse } from "next/server";
import generateCourse from "@/openai/queries/generate-course/function";
import { GeneratedCourse } from "@/openai/queries/generate-course/schema";
import prisma from "@/db/prisma-client";
import { auth } from "@clerk/nextjs/server";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
    try {
        // Auth
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        // Validation
        const parsedBody = await parseRequestBody(req);
        if (!parsedBody.success) {
            return NextResponse.json({
                message: "Invalid request body",
                error: parsedBody.error,
            }, { status: 400 });
        }

        const course = await generateCourse(JSON.stringify(parsedBody.data));
        console.log({ generation_result: course });

        const result = await saveCourseToDb(course, userId);
        console.log({ db_result: result });

        return NextResponse.json({ id: result.id }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}

async function saveCourseToDb(course: GeneratedCourse, userId: string) {
    return prisma.course.create({
        select: {
            id: true,
        },
        data: {
            id: uuidV4(),
            title: course.title,
            description: course.description,
            startDate: new Date(course.startDate),
            endDate: new Date(course.endDate),
            userId: userId,
            sections: prepareCourseSectionsJson(course.sections)
        }
    });
}

function prepareCourseSectionsJson(courseSections: GeneratedCourse['sections']): PrismaJson.CourseSectionsType {
    const sections: PrismaJson.CourseSectionsType = [];
    for (const section of courseSections) {
        const lessons: PrismaJson.CourseSectionsType[number]['lessons'] = [];
        for (const lesson of section.lessons) {
            lessons.push({
                id: uuidV4(),
                title: lesson.title,
                description: lesson.description,
                date: new Date(lesson.date)
            });
        }
        sections.push({
            id: uuidV4(),
            title: section.title,
            description: section.description,
            startDate: new Date(section.startDate),
            endDate: new Date(section.endDate),
            lessons,
        })
    }
    return sections;
}

async function parseRequestBody(req: NextRequest) {
    const QuizAnswersSchema = z.object({
        answers: z.array(
            z.object({
                question: z.string(),
                answer: z.string().or(z.array(z.string()))
            })
        )
    });

    const body = await req.json();
    return QuizAnswersSchema.safeParse(body);
}