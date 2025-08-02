
import { findOneByIdAndUserId } from "@/app/actions/lesson-actions";
import LessonContent from "@/components/modules/lesson/lesson-content";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page({
    params
}: {
    params: Promise<{
        lessonId: string;
        courseId: string;
    }>
}) {
    const { userId } = await auth();
    if (!userId) redirect('/');

    const { lessonId, courseId } = await params;

    const lessonData = await findOneByIdAndUserId(lessonId, userId);
    if (!lessonData) notFound();

    return (
        <>
            <LessonContent lesson={lessonData} userId={userId} />
            <div className="flex flex-col sm:flex-row gap-4 pb-10 justify-center items-center">
                <Link href={`/courses/${courseId}`}>
                    <Button
                        size="lg"
                        variant="outline"
                        className="min-w-[180px]"
                    >
                        ← Back to Course
                    </Button>
                </Link>

                {/* Optional: Next lesson button if there is one */}
                {/* <Link href={`/courses/${courseId}/lessons/${nextLessonId}`}>
                    <Button
                        size="lg"
                        className="min-w-[180px]"
                    >
                        Next Lesson →
                    </Button>
                </Link> */}
            </div>
        </>
    );
}