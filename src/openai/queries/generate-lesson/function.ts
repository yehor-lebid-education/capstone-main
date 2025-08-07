import client from "@/openai/client";
import { sanitizeInput } from "@/openai/security";
import { systemPrompt, userPrompt } from "./prompt";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { GeneratedLessonContent, GeneratedLessonContentSchema } from "./schema";

export default async function generateLesson(lessonContext: string) {
    const { sanitized } = sanitizeInput(lessonContext, { strictMode: true });
    const _systemPrompt = systemPrompt();
    const _userPrompt = userPrompt(sanitized);

    try {
        const response = await client.responses.parse({
            model: 'gpt-4.1-mini-2025-04-14',
            max_output_tokens: 6000,
            input: [
                {
                    role: 'system',
                    content: _systemPrompt,
                },
                {
                    role: 'user',
                    content: _userPrompt,
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
        try {
            return await retry(_systemPrompt, _userPrompt, error);
        } catch (error) {
            console.error("Error generating lesson after retry:", error);
            throw new Error("Failed to generate lesson");
        }
    }
}

async function retry(systemPrompt: string, userPrompt: string, error: unknown) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);

    const response = await client.responses.parse({
        model: 'gpt-4.1-mini-2025-04-14',
        max_output_tokens: 2000,
        input: [
            {
                role: 'system',
                content: `Prompt failed with error: <error>${errorMessage}<error> Retry Prompt: <prompt>${systemPrompt}</prompt>`,
            },
            {
                role: 'user',
                content: userPrompt,
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
}