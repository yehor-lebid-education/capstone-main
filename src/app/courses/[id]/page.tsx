import { findOneByIdAndUserId } from "@/app/actions/course-actions";
import CourseBlock from "@/components/modules/course/course-block";
import CourseDetails from "@/components/modules/course/course-details";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) redirect('/');

    const { id } = await params;

    const course = await findOneByIdAndUserId(id, userId);
    if (!course) notFound();

    console.log(course);

    return (<CourseDetails course={course} />);
}