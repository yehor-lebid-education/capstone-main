import { z } from 'zod';

export const GeneratedLessonSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().datetime(),
});

export const GeneratedSectionSchema = z.object({
    title: z.string(),
    description: z.string(),
    lessons: z.array(GeneratedLessonSchema),
    startDate: z.string().date(),
    endDate: z.string().date(),
});

export const GeneratedCourseSchema = z.object({
    title: z.string(),
    description: z.string(),
    sections: z.array(GeneratedSectionSchema),
    startDate: z.string().date(),
    endDate: z.string().date(),
});

export type GeneratedLesson = z.infer<typeof GeneratedLessonSchema>;
export type GeneratedSection = z.infer<typeof GeneratedSectionSchema>;
export type GeneratedCourse = z.infer<typeof GeneratedCourseSchema>;

export const jsonSchemaString = (
    `
{
  "title": "string",                  // Course title, e.g. "React Beginner to Intermediate Study Plan"
  "description": "string",            // Course description, e.g. "A practical plan to learn React for the workplace."
  "sections": [
    {
      "title": "string",              // Section title, e.g. "React Fundamentals"
      "description": "string",        // Section description, e.g. "Start by mastering React basics."
      "lessons": [
        {
          "title": "string",          // Lesson title, e.g. "JSX and Components"
          "description": "string",    // Lesson description, e.g. "Learn how to write JSX and create components."
          "date": "string"            // ISO 8601 datetime, e.g. "2025-06-24T18:00:00Z"
        }
      ],
      "startDate": "string",          // "YYYY-MM-DD" (ISO date), e.g. "2025-06-24"
      "endDate": "string"             // "YYYY-MM-DD" (ISO date), e.g. "2025-06-29"
    }
  ],
  "startDate": "string",              // "YYYY-MM-DD" (ISO date), e.g. "2025-06-24"
  "endDate": "string"                 // "YYYY-MM-DD" (ISO date), e.g. "2025-08-02"
}
`
);