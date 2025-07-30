import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import generateStartQuestions from "@/openai/queries/generate-start-questions";


export async function POST(req: NextRequest) {
    try {
        const { skill } = await parseFormData(req);

        const questions = await generateStartQuestions(skill);

        console.log(questions);

        return NextResponse.json(
            { data: questions },
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

async function parseFormData(req: NextRequest) {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    const parsed = StartQuestionsRequestSchema.safeParse(data);
    if (!parsed.success) {
        throw new Error("Invalid request data");
    }

    return parsed.data;
}