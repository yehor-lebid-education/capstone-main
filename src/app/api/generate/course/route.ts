import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import generateCourse from "@/openai/queries/generate-course/function";
import { generatedCourseExample1 } from "@/specs/data";

const QuizAnswersSchema = z.object({
    answers: z.array(
        z.object({
            question: z.string(),
            answer: z.string().or(z.array(z.string()))
        })
    )
});

export async function POST(req: NextRequest) {
    try {
        const parsed = await parseRequestBody(req);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        // TODO: Uncomment later when the function is ready
        // const educationalPlan = await generateCourse(JSON.stringify(parsed.data));

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(10000); // Simulate processing delay
        const educationalPlan = generatedCourseExample1;

        console.log(educationalPlan);

        return NextResponse.json(
            { data: educationalPlan },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}

async function parseRequestBody(req: NextRequest) {
    const body = await req.json();
    return QuizAnswersSchema.safeParse(body);
}