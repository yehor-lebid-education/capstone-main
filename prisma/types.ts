declare global {
    namespace PrismaJson {
        export type CourseSectionsType = {
            id: string;
            title: string;
            description: string;
            startDate: Date | string;
            endDate: Date | string;
            lessons: {
                id: string;
                title: string;
                description: string;
                date: Date | string;
            }[];
        }[];

        export type LessonQuizType = {
            id: string;
            question: string;
            options: string[];
            userAnswerIdx: number;
            correctAnswerIdx: number;
        }[];
    }
}

export {};