import { findOneByIdAndUserId } from "@/app/actions/course-actions";
import CourseDetails from "@/components/modules/course/course-details";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ courseId: string }> }) {
    const { userId } = await auth();
    if (!userId) redirect('/');

    const { courseId } = await params;

    const course = await findOneByIdAndUserId(courseId, userId);
    if (!course) notFound();

    console.log(course);

    return (<CourseDetails course={course} />);
}