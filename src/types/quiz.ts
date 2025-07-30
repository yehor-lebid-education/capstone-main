export type QuestionText = {
    question: string;
    type: "text";
};

export type QuestionSelect = {
    question: string;
    type: "select" | "multi-select";
    answers: string[];
};

export type Question = QuestionText | QuestionSelect;

export type QuestionAnswer = {
    question: string;
    answer: string | string[];
};
