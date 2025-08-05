'use client';

import { Markdown } from "@/components/common/markdown";
import { Lesson } from "@/generated/prisma";
import LessonQuiz from "./lesson-quiz";
import { toast } from "sonner";
import { submitLessonAnswers } from "@/app/actions/lesson-actions";

export default function LessonContent({
    lesson,
    userId,
}: {
    lesson: Lesson,
    userId: string,
}) {

    async function saveAnswers(answers: Record<string, number>) {
        try {
            toast.message('Saving answers');
            await submitLessonAnswers(lesson.id, userId, answers);
            toast.success('Answers saved successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to save answers');
        }
    }

    return (
        <div className="max-w-full">
            <Markdown content={lesson.content} />
            <LessonQuiz lesson={lesson} onSubmit={saveAnswers} />
        </div>
    )
}