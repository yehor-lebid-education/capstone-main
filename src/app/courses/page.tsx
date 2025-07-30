
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { findManyByUserId } from "../actions/course-actions";
import Container from "@/components/layout/container";
import { CourseCard } from "@/components/modules/course/course-card";

export default async function Page() {
    const { userId } = await auth();
    if (!userId) redirect('/');

    const courses = await findManyByUserId(userId)

    return (
        <Container>
            { courses.map(course => <CourseCard key={course.id} course={course} />) }
        </Container>
    )
}