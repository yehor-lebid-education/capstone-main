import { Question } from "@/types/quiz";

export const LOADING_STEPS: string[] = [
    "Processing your quiz responses...",
    "Analyzing your learning style...",
    "Researching skill requirements...",
    "Building course outline...",
    "Creating personalized lessons...",
    "Adding practice exercises...",
    "Finalizing your course!"
];

export const START_QUESTIONS = [
    {
        "question": "What skill do you want to learn?",
        "type": "text",
    },
    {
        "question": "How would you describe your current expertise with this skill?",
        "type": "select",
        "answers": [
            "No experience",
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
            "Build a practical project",
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
            "Troubleshooting & debugging",
            "Tooling and environment setup"
        ]
    },
    {
        "question": "Which days of the week can you dedicate to studying?",
        "type": "multi-select",
        "answers": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ]
    },
    {
        "question": "What time of day do you prefer to study?",
        "type": "multi-select",
        "answers": [
            "Morning (before 9 AM)",
            "Midday (9 AM to 1 PM)",
            "Afternoon (1 PM to 5 PM)",
            "Evening (6 PM to 9 PM)",
            "Night (after 9 PM)",
        ],
    },
    {
        "question": "Do you have any deadlines or targets for completing this learning?",
        "type": "select",
        "answers": [
            "1 month",
            "2 months",
            "3 months",
            "6 months",
            "No specific deadline",
        ],
    },
] satisfies Question[];