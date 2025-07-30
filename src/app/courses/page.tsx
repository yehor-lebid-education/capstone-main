
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findManyByUserId } from "../actions/course-actions";
import Container from "@/components/layout/container";
import { CourseCard } from "@/components/modules/course/course-card";

export default async function Page() {
    const { userId } = await auth();
    if (!userId) redirect('/');

    const courses = await findManyByUserId(userId)

    return (
        <Container className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {courses.map(course => (
                <div className="w-full flex justify-center items-center" key={course.id}>
                    <CourseCard course={course} />
                </div>
            ))}
        </Container>
    )
}