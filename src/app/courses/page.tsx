import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findManyByUserId } from "../actions/course-actions";
import Container from "@/components/layout/container";
import { CourseCard } from "@/components/modules/course/course-card";
import Row from "@/components/layout/row";
import TypographySectionTitle from "@/components/ui/custom/typography-section-title";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default async function Page() {
    const { userId } = await auth();
    if (!userId) redirect('/');

    const courses = await findManyByUserId(userId);

    return (
        <Container>
            <Row variant="xl">
                <TypographySectionTitle>My courses:</TypographySectionTitle>
            </Row>
            <Container className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                {/* Start New Learning Card */}
                <div className="w-full flex justify-center items-center">
                    <Link href="/create-course" className="w-full">
                        <Card className="w-full h-full border-2 border-dashed border-gray-300 hover:border-primary transition-colors cursor-pointer group">
                            <CardContent className="flex flex-col items-center justify-center p-8 h-full min-h-[200px]">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                    <Plus className="w-12 h-12 text-gray-400 group-hover:text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 group-hover:text-primary text-center">
                                    Start New Learning
                                </h3>
                                <p className="text-sm text-muted-foreground text-center mt-2">
                                    Take a quiz to create a personalized course
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Existing Courses */}
                {courses.map(course => (
                    <div className="w-full flex justify-center items-center" key={course.id}>
                        <CourseCard course={course} />
                    </div>
                ))}
            </Container>
        </Container>
    );
}
