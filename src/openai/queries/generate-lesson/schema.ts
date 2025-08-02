import z from "zod";

export const GeneratedQuizSchema = z.object({
    question: z.string().min(1, 'Question is required'),
    options: z.array(z.string().min(1, 'Option is required')).length(4, 'Options length should be 4'),
    correctAnswerIdx: z.number().min(0).max(3),
});

export const GeneratedLessonContentSchema = z.object({
    content: z.string().min(1, 'Lesson content is required'),
    quiz: z.array(GeneratedQuizSchema).length(4, 'Quiz should have 4 items'),
});

export type GeneratedLessonContent = z.infer<typeof GeneratedLessonContentSchema>;
export type GeneratedQuiz = z.infer<typeof GeneratedQuizSchema>;

export const jsonSchemaString = (
    `
    {
        "content": "string"; // Lesson actual content
        "quiz": [
            {
                "question": "string";      // Quiz question, e.g. "What is the main purpose of useMemo?"
                "options": "string[]";     // Quiz answer options, e.g ["To manage DOM references", "To avoid unnecessary recalculations between renders",, "To fetch data on mount", "To update state"]
                "correctAnswerIdx": number; // Quiz right answer index from "options" array, e.g: 1
            }
        ]
    }
`
);