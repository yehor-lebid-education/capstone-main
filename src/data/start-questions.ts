import { Question } from "@/types/quiz";

export const LOADING_STEPS: string[] = [
    "Processing your quiz responses...",
    "Analyzing your learning objectives and experience...",
    "Identifying key areas for personalized growth...",
    "Outlining your structured learning path...",
    "Designing lessons and study sessions...",
    "Scheduling topics to match your availability...",
    "Curating recommended resources...",
    "Finalizing your course. It may take a few seconds...",
].map((step, i, arr) => `${i + 1} of ${arr.length}: ${step}`);

export const START_QUESTIONS = [
    {
        "question": "What skill do you want to learn?",
        "type": "text",
    },
    {
        "question": "How would you describe your current expertise with this skill?",
        "type": "select",
        "answers": [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert"
        ],
    },
    {
        "question": "What is the main goal you want to achieve by learning this skill?",
        "type": "select",
        "answers": [
            "Build expertise through practical exercises",
            "Pass a certification exam",
            "Change careers",
            "Improve current job skills",
            "Personal enrichment"
        ]
    },
    {
        "question": "Which areas of this skill are you most interested in?",
        "type": "select",
        "answers": [
            "Fundamentals and theory",
            "Practical application",
            "Advanced concepts",
        ]
    },
] satisfies Question[];