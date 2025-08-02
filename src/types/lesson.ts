import { Course } from "@/generated/prisma";

export type CourseSectionDetails = Course['sections'][number];
export type CourseLessonDetails = CourseSectionDetails['lessons'][number];

export type CourseLessonDetailsWithMeta = CourseLessonDetails & {
    isGenerated: boolean,
    isCompleted: boolean
};