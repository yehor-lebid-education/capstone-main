import client from '@/openai/client';
import { systemPrompt, userPrompt } from './prompt';
import { GeneratedCourse, GeneratedCourseSchema } from './schema';
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { sanitizeInput } from '@/openai/security';

export default async function generateCourse(quizAnswers: string) {
    const { sanitized } = sanitizeInput(quizAnswers, { strictMode: true });

    const _systemPrompt = systemPrompt();
    const _userPrompt   = userPrompt(sanitized);

    try {
        const response = await client.responses.parse({
            model: 'gpt-4.1-mini-2025-04-14',
            max_output_tokens: 2000,
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
                    GeneratedCourseSchema,
                    'generated_course'
                ),
            }
        });

        return response.output_parsed as GeneratedCourse;
    } catch (error: unknown) {
        console.error("Error generating course. Retry:", error);
        try {
            return await retry(_systemPrompt, _userPrompt, error);
        } catch (error) {
            console.error("Error generating course after retry:", error);
            throw new Error("Failed to generate course");
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
                GeneratedCourseSchema,
                'generated_course'
            ),
        }
    });
    return response.output_parsed as GeneratedCourse;
}