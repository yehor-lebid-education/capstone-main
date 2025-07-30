// components/CourseDisplay.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { Course } from "@/generated/prisma";

export default function CourseDetails({ course }: { course: Course }) {
    // Calculate total lessons across all sections
    const totalLessons = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);

    // Format dates for display
    const formatDate = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatDateTime = (date: Date | string) => {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate course duration
    const startDate = new Date(course.startDate);
    const endDate = new Date(course.endDate);
    const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 pb-15">
            {/* Course Header Card */}
            <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                    <div className="flex justify-between items-start mb-4">
                        <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
                        <Badge variant="secondary" className="text-sm">
                            {course.sections.length} Sections
                        </Badge>
                    </div>
                    <CardDescription className="text-lg leading-relaxed mb-6">
                        {course.description}
                    </CardDescription>

                    {/* Course Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">{totalLessons} Lessons</p>
                                <p className="text-xs text-muted-foreground">Total content</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">{durationDays} Days</p>
                                <p className="text-xs text-muted-foreground">Duration</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">{formatDate(startDate)} - {formatDate(endDate)}</p>
                                <p className="text-xs text-muted-foreground">Schedule</p>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Course Sections */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={course.sections[0]?.title}>
                        {course.sections.map((section, sectionIndex) => (
                            <AccordionItem key={section.title} value={section.title} className="border rounded-lg">
                                <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 rounded-t-lg data-[state=open]:rounded-b-none cursor-pointer">
                                    <div className="flex items-center justify-between w-full mr-4">
                                        <div className="text-left">
                                            <h3 className="font-semibold text-lg">
                                                Section {sectionIndex + 1}: {section.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {section.lessons.length} lessons • {formatDate(new Date(section.startDate))} - {formatDate(new Date(section.endDate))}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="ml-4">
                                            {section.lessons.length} lessons
                                        </Badge>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="px-0 pb-0">
                                    <div className="px-6 py-4 bg-muted/30">
                                        <p className="text-muted-foreground mb-4">{section.description}</p>

                                        {/* Lessons Table */}
                                        <div className="bg-background rounded-lg border overflow-hidden">
                                            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
                                                <div className="col-span-4">Lesson</div>
                                                <div className="col-span-5">Description</div>
                                                <div className="col-span-2">Date & Time</div>
                                                <div className="col-span-1 text-center">Status</div>
                                            </div>

                                            {section.lessons.map((lesson, lessonIndex) => (
                                                <div key={lesson.title} className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                                                    <div className="col-span-4">
                                                        <h4 className="font-medium text-sm">{lesson.title}</h4>
                                                    </div>
                                                    <div className="col-span-5">
                                                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-xs text-muted-foreground">{formatDateTime(lesson.date)}</p>
                                                    </div>
                                                    <div className="col-span-1 flex justify-center">
                                                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Section Footer */}
                                            <div className="grid grid-cols-12 gap-4 p-4 bg-muted/30 border-t">
                                                <div className="col-span-8">
                                                    <p className="text-sm font-medium">Section Progress</p>
                                                </div>
                                                <div className="col-span-4">
                                                    <div className="flex items-center gap-2">
                                                        <Progress value={0} className="flex-1" />
                                                        <span className="text-xs text-muted-foreground">0%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            {/* Overall Progress Card */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Progress value={0} className="flex-1" />
                        <span className="text-sm font-medium">0% Complete</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        0 of {totalLessons} lessons completed
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
