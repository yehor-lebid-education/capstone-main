import { Progress } from "@radix-ui/react-progress";
import LessonStatus from "./lesson-status";
import { formatDateTime } from "@/lib/formatters";
import { CourseData } from "@/app/actions/course-actions";
import Link from "next/link";

export default function SectionDetailsRow({
    course,
    section,
    disabled,
}: {
    course: CourseData,
    section: CourseData['sections'][number],
    disabled: boolean
}) {
    const lessons = section.lessons.map((lesson) => {
        const generatedLesson = course.lessons.find(({ id }) => lesson.id === id);

        const isGenerated = typeof generatedLesson !== 'undefined';
        const isCompleted = isGenerated && generatedLesson.completed;

        return { ...lesson, isGenerated, isCompleted };
    });

    const isDisabled = (idx: number) => disabled || (idx !== 0 && !lessons[idx - 1].isCompleted);
    const completedLessons = lessons.reduce((completed, lesson) => completed += lesson.isCompleted ? 1 : 0, 0);
    const progressInPercent = Math.ceil((completedLessons * 100) / lessons.length);


    return (
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

                {lessons.map((lesson, idx) => (
                    <div key={lesson.title} className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                        <div className="col-span-4">
                            {
                                lesson.isGenerated && !isDisabled(idx)
                                    ? (
                                        <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                                            <h4 className="font-medium text-sm hover:text-primary">{lesson.title}</h4>
                                        </Link>
                                    )
                                    : (<h4 className="font-medium text-sm">{lesson.title}</h4>)
                            }
                        </div>
                        <div className="col-span-5">
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-xs text-muted-foreground">{formatDateTime(lesson.date)}</p>
                        </div>
                        <div className="col-span-1 flex justify-center">
                            <LessonStatus
                                lesson={lesson}
                                courseId={course.id}
                                sectionId={section.id}
                                disabled={isDisabled(idx)}
                            />
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
                            <span className="text-xs text-muted-foreground">{progressInPercent}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}