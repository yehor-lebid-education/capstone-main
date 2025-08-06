// components/CourseCard.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Course } from "@/generated/prisma";


export function CourseCard({ course }: { course: Course }) {
    // Calculate total lessons across all sections
    const totalLessons = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);

    return (
        <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300 h-fit">
            <CardHeader>
                <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-semibold line-clamp-2">
                        {course.title}
                    </CardTitle>
                    <Badge variant="secondary">
                        {course.sections.length} Sections
                    </Badge>
                </div>
                <CardDescription className="line-clamp-3">
                    {course.description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-3">
                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{totalLessons} lessons</span>
                        </div>

                    </div>

                    {/* Section Preview */}
                    <div className="border-t pt-3">
                        <p className="text-sm font-medium mb-2">Course Sections:</p>
                        <div className="space-y-1">
                            {course.sections.slice(0, 2).map((section, index) => (
                                <div key={index} className="text-xs text-muted-foreground">
                                    • {section.title}
                                </div>
                            ))}
                            {course.sections.length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                    • And {course.sections.length - 2} more sections...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-4">
                <Button asChild className="w-full">
                    <Link href={`/courses/${course.id}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Continue Learning
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
