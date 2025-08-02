import client from "@/openai/client";
import { sanitizeInput } from "@/openai/security";
import { systemPrompt, userPrompt } from "./prompt";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { GeneratedLessonContent, GeneratedLessonContentSchema } from "./schema";

export default async function generateLesson(lessonContext: string) {
    try {
        const { sanitized } = sanitizeInput(lessonContext, { strictMode: true });
        const response = await client.responses.parse({
            model: 'gpt-4.1-nano-2025-04-14',
            max_output_tokens: 6000,
            input: [
                {
                    role: 'system',
                    content: systemPrompt(),
                },
                {
                    role: 'user',
                    content: userPrompt(sanitized),
                }
            ],
            text: {
                format: zodTextFormat(
                    GeneratedLessonContentSchema,
                    'generated_lesson'
                )
            }
        });

        return response.output_parsed as GeneratedLessonContent;
    } catch (error) {
        console.error("Error generating lesson:", error);
        throw new Error("Failed to generate lesson");
    }
}