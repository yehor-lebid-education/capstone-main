
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findManyByUserId } from "../actions/course-actions";
import Container from "@/components/layout/container";
import { CourseCard } from "@/components/modules/course/course-card";
import { TypographyH2 } from "@/components/ui/custom/typography-h2";
import Row from "@/components/layout/row";
import TypographySectionTitle from "@/components/ui/custom/typography-section-title";

export default async function Page() {
    const { userId } = await auth();
    if (!userId) redirect('/');

    const courses = await findManyByUserId(userId)

    return (
        <Container>
            <Row variant="xl">
                <TypographySectionTitle>My courses:</TypographySectionTitle>
            </Row>
            <Container className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                {courses.map(course => (
                    <div className="w-full flex justify-center items-center" key={course.id}>
                        <CourseCard course={course} />
                    </div>
                ))}
            </Container>
        </Container>
    )
}