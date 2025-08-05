'use client';

import { Button } from "@/components/ui/button";
import { CourseLessonDetailsWithMeta } from "@/types/lesson";
import { useAuth } from "@clerk/nextjs";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LessonStatus({
    sectionId,
    courseId,
    lesson,
    disabled,
}: {
    sectionId: string,
    courseId: string,
    lesson: CourseLessonDetailsWithMeta,
    disabled: boolean
}) {
    const router = useRouter();
    const { getToken } = useAuth();
    const [isGenerating, setIsGenerating] = useState(false);

    if (lesson.isGenerated) {
        return (
            lesson.isCompleted
                ? (<CheckCircle2 className="h-4 w-4 text-green-500" />)
                : (<CheckCircle2 className="h-4 w-4 text-muted-foreground" />)
        )
    }

    async function handleGenerate() {
        if (isGenerating || disabled) return;

        setIsGenerating(true);
        toast.message("Lesson generation started...");

        try {
            const token = await getToken();
            const response = await fetch("/api/generate/lesson", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    courseId,
                    sectionId,
                    lessonId: lesson.id,
                }),
            });

            const { id } = await response.json() as { id: string };

            toast.success("Lesson generated successfully!");
            router.push(`/courses/${courseId}/lessons/${id}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate course. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div title={disabled ? "Complete previous lessons to unlock" : "Generate lesson"}>
            <Button
                variant="default"
                onClick={() => handleGenerate()}
                disabled={disabled || isGenerating}
            >
                {isGenerating ? <Loader2 className="animate-spin" /> : "Generate"}
            </Button>
        </div>
    )
}