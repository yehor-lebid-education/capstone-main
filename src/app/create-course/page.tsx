'use client';

import AnimatedBackground from "@/components/common/animated-background";
import Container from "@/components/layout/container";
import StartQuiz from "@/components/modules/start-quiz/start-quiz";
import LoadingCard from "@/components/ui/custom/loading-card";
import { LOADING_STEPS, START_QUESTIONS } from "@/data/start-questions";
import { QuestionAnswer } from "@/types/quiz";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const [loading, setLoading] = useState(false);

    async function onQuizComplete(answers: QuestionAnswer[]) {
        console.log("Quiz completed with answers:", answers);
        toast.success("Quiz completed! Generating course...");
        setLoading(true);

        try {
            const response = await fetch("/api/generate/course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers }),
            });

            const data = await response.json();
            console.log(data);
            toast.success("Course generated successfully!");
        } catch (error) {
            toast.error("Failed to generate course. Please try again.");
            setLoading(false);
        }
    }

    return (
        <Container>
            <AnimatedBackground />
            <Container variant="full-centered">
                {
                    loading
                        ? (<LoadingCard title="Creating educational plan for you. Please do not leave page" steps={LOADING_STEPS} />)
                        : (<StartQuiz questions={START_QUESTIONS} onComplete={onQuizComplete} />)
                }
            </Container>
        </Container>
    );
}