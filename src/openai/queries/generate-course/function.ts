import client from '@/openai/client';
import { systemPrompt, userPrompt } from './prompt';
import { GeneratedCourse, GeneratedCourseSchema } from './schema';
import { zodTextFormat } from 'openai/helpers/zod.mjs';
import { sanitizeInput } from '@/openai/security';

export default async function generateCourse(
    quizAnswers: string,
) {
    try {
        const { sanitized } = sanitizeInput(quizAnswers, { strictMode: true });

        const response = await client.responses.parse({
            model: 'gpt-4.1-nano-2025-04-14',
            max_output_tokens: 1000,
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
                    GeneratedCourseSchema,
                    'generated_course'
                ),
            }
        });

        return response.output_parsed as GeneratedCourse;
    } catch (error) {
        console.error("Error generating course:", error);
        throw new Error("Failed to generate course");
    }
}