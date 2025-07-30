'use client';

import AnimatedBackground from "@/components/common/animated-background";
import Container from "@/components/layout/container";
import Row from "@/components/layout/row";
import StartQuiz from "@/components/modules/start-quiz/start-quiz";
import { Button } from "@/components/ui/button";
import LoadingCard from "@/components/ui/custom/loading-card";
import { TypographyH1 } from "@/components/ui/custom/typography-h1";
import { Input } from "@/components/ui/input";
import { LOADING_STEPS, START_QUESTIONS } from "@/data/start-questions";
import { useState } from "react";

export default function Page() {
    const [loading, setLoading] = useState(false);

    // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //     event.preventDefault();

    //     try {
    //         setLoading(true);
    //         const response = await fetch("/api/generate/start-questions", {
    //             method: "POST",
    //             body: new FormData(event.currentTarget),
    //         });

    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.error("Error submitting form:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        <Container>
            <AnimatedBackground />
            <Container variant="full-centered">
                {
                    !loading && <StartQuiz
                        questions={START_QUESTIONS}
                        onComplete={(answers) => {
                            console.log("Quiz completed with answers:", answers);
                            setLoading(true);
                        }}
                    />
                }
                {
                    loading && <LoadingCard steps={LOADING_STEPS} />
                }
            </Container>
        </Container>
    );
}