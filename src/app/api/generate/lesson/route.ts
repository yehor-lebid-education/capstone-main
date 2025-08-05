'use server';

import z from "zod";
import { v4 as uuidV4 } from 'uuid';
import { Lesson } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { _getContextDataForLessonGeneration } from "@/app/actions/course-actions";
import { _createLesson, lessonExistsByIdAndUserId } from "@/app/actions/lesson-actions";
import generateLesson from "@/openai/queries/generate-lesson/function";
import { GeneratedLessonContent } from "@/openai/queries/generate-lesson/schema";

export async function POST(req: NextRequest) {
    try {
        // auth
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const parsedBody = await parseRequestBody(req);
        if (!parsedBody.success) {
            return NextResponse.json({
                message: "Invalid request body",
                error: parsedBody.error,
            }, { status: 400 });
        }

        const { courseId, sectionId, lessonId } = parsedBody.data;

        // Verify if lesson already generated
        const lessonExists = await lessonExistsByIdAndUserId(lessonId, userId);
        if (lessonExists) {
            return NextResponse.json({
                message: "Lesson already exists",
                redirectTo: `/courses/${courseId}/lessons/${lessonId}`,
            }, { status: 409 });
        }

        // Prepare context for lesson generation
        const lessonGenerationContext = await _getContextDataForLessonGeneration(
            courseId, sectionId, lessonId, userId,
        );

        // Generate lesson and save to db
        const generatedLesson = await generateLesson(JSON.stringify(lessonGenerationContext));
        console.log({ generation_result: generatedLesson });
        const lessonModel = _generatedLessonToLessonModel(lessonId, userId, courseId, generatedLesson);
        
        const result = await _createLesson(lessonModel);
        console.log({ db_result: result });

        // Return response to client
        return NextResponse.json({ id: result.id }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}

async function parseRequestBody(req: NextRequest) {
    const bodySchema = z.object({
        courseId: z.string().uuid('Course id is required'),
        sectionId: z.string().uuid('Section id is required'),
        lessonId: z.string().uuid('Lesson id is required'),
    });

    const body = await req.json();
    return bodySchema.safeParse(body);
}

function _generatedLessonToLessonModel(
    id: string,
    userId: string,
    courseId: string,
    { content, quiz }: GeneratedLessonContent,
): Lesson {
    const preparedQuiz: Lesson['quiz'] = quiz.map(({ 
        options,
        question,
        correctAnswerIdx,
    }) => ({
        id: uuidV4(),
        options,
        question,
        correctAnswerIdx,
        userAnswerIdx: -1,
    }));

    return {
        id,
        userId,
        content,
        courseId,
        completed: false,
        quiz: preparedQuiz,
    }

}