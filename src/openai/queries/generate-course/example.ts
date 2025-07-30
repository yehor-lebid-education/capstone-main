export const generatedCourseExample = {
    "title": "React Beginner to Intermediate Study Plan",
    "description": "A practical learning plan to build strong foundations in React, progress through core concepts, and apply them in workplace scenarios. Tailored for evening study sessions on Monday, Friday, and Sunday over two months.",
    "startDate": "2025-07-30",
    "endDate": "2025-09-29",
    "sections": [
        {
            "title": "React Fundamentals",
            "description": "Start by understanding core React concepts, including components, state, and JSX. These foundations are essential for effective React development.",
            "startDate": "2025-07-30",
            "endDate": "2025-08-09",
            "lessons": [
                {
                    "title": "Getting Started with React and JSX",
                    "description": "Learn what React is, its advantages, and how to use JSX to define UI structure.",
                    "date": "2025-07-30T18:00:00Z"
                },
                {
                    "title": "Functional and Class Components",
                    "description": "Explore the two main types of React components and their use cases.",
                    "date": "2025-08-02T18:00:00Z"
                },
                {
                    "title": "Props and State Fundamentals",
                    "description": "Understand how to pass data in React apps and manage local state within components.",
                    "date": "2025-08-04T18:00:00Z"
                }
            ]
        },
        {
            "title": "Core React Concepts",
            "description": "Deepen your understanding of essential React concepts and begin building interactive UIs.",
            "startDate": "2025-08-11",
            "endDate": "2025-08-23",
            "lessons": [
                {
                    "title": "Handling Events and Conditional Rendering",
                    "description": "Practice event handling and control what is rendered based on state and props.",
                    "date": "2025-08-11T18:00:00Z"
                },
                {
                    "title": "Lists and Keys",
                    "description": "Learn how to render lists and manage keys for component identity.",
                    "date": "2025-08-15T18:00:00Z"
                },
                {
                    "title": "Component Composition and Reusability",
                    "description": "Develop modular code using props.children and reusable components.",
                    "date": "2025-08-18T18:00:00Z"
                }
            ]
        },
        {
            "title": "React Hooks Basics",
            "description": "Transition from stateful class components to modern functional programming with hooks.",
            "startDate": "2025-08-25",
            "endDate": "2025-09-04",
            "lessons": [
                {
                    "title": "Introduction to useState and useEffect",
                    "description": "Master state updating and side effects with React's essential hooks.",
                    "date": "2025-08-25T18:00:00Z"
                },
                {
                    "title": "Practical Application: Small Interactive App",
                    "description": "Apply hooks in a mini-project, such as a to-do list or counter app.",
                    "date": "2025-08-29T18:00:00Z"
                },
                {
                    "title": "Hooks Best Practices",
                    "description": "Understand common patterns, pitfalls, and when to use hooks vs. other techniques.",
                    "date": "2025-09-01T18:00:00Z"
                }
            ]
        },
        {
            "title": "Workplace Readiness & Application",
            "description": "Connect theory to real-world job scenarios. Build confidence by simulating workplace tasks.",
            "startDate": "2025-09-06",
            "endDate": "2025-09-20",
            "lessons": [
                {
                    "title": "Integrating APIs in React",
                    "description": "Learn how to fetch, display, and manage external data using fetch or Axios.",
                    "date": "2025-09-06T18:00:00Z"
                },
                {
                    "title": "Simple Portfolio Showcase",
                    "description": "Create a static portfolio or basic project showcase site using learned skills.",
                    "date": "2025-09-13T18:00:00Z"
                },
                {
                    "title": "Debugging and Productivity Tools",
                    "description": "Get introduced to React DevTools and strategies for identifying and solving common issues.",
                    "date": "2025-09-17T18:00:00Z"
                }
            ]
        },
        {
            "title": "Final Review and Next Steps",
            "description": "Assess your progress, reinforce learning, and plan for further development.",
            "startDate": "2025-09-22",
            "endDate": "2025-09-29",
            "lessons": [
                {
                    "title": "Review Knowledge and Fill Gaps",
                    "description": "Reflect on completed lessons and repeat topics as needed.",
                    "date": "2025-09-22T18:00:00Z"
                },
                {
                    "title": "Explore Intermediate Topics",
                    "description": "Preview next-level concepts like React Router, context, and performance optimization.",
                    "date": "2025-09-26T18:00:00Z"
                },
                {
                    "title": "Personal Learning Plan Forward",
                    "description": "Set goals for future learning and identify recommended online resources.",
                    "date": "2025-09-29T18:00:00Z"
                }
            ]
        }
    ]
};

export const quizQuestionsExample = [
    {
        "question": "What skill do you want to learn?",
        "answer": "React",
    },
    {
        "question": "How would you describe your current expertise with this skill?",
        "answer": "Beginner",
    },
    {
        "question": "What is the main goal you want to achieve by learning this skill?",
        "answer": "Improve current job skills",
    },
    {
        "question": "Which areas of this skill are you most interested in?",
        "answers": "Fundamentals and theory",
    },
    {
        "question": "Which days of the week can you dedicate to studying?",
        "answer": ["Monday", "Friday", "Sunday",]
    },
    {
        "question": "What time of day do you prefer to study?",
        "answers": "Evening (6 PM to 9 PM)",
    },
    {
        "question": "Do you have any deadlines or targets for completing this learning?",
        "type": "select",
        "answer": "2 months",
    },
];


export const generatedCourseExampleJSON = JSON.stringify(generatedCourseExample);
export const quizQuestionsExampleJSON = JSON.stringify(quizQuestionsExample);