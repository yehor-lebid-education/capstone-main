# EduMentor

EduMentor is a modern, full-stack web application designed to help users create, manage, and follow personalized educational courses. Built with [Next.js](https://nextjs.org), Prisma, and PostgreSQL, it leverages AI to generate tailored learning paths and lesson content based on user goals and experience.

---

## Features

- **User Authentication:** Secure sign-in and sign-up via Clerk.
- **Personalized Course Generation:** Users answer a quiz, and the app generates a custom course plan using OpenAI.
- **Structured Learning Paths:** Courses are divided into sections and lessons, each with descriptions, dates, and quizzes.
- **Lesson Generation:** Each lesson is generated with detailed content, practical examples, and quiz questions.
- **Progress Tracking:** Lessons can be marked as completed.
- **Modern UI:** Built with React, Tailwind CSS, and Radix UI components.
- **Syntax Highlighting:** Markdown content with code blocks is rendered with syntax highlighting.
- **Admin/CRUD:** Users can view and continue their courses.

---

## Main Logic

1. **Course Creation:**
   - Users answer a series of questions about their learning goals and experience.
   - The app sends this data to an API route, which uses OpenAI to generate a course structure (sections, lessons, dates).
   - The generated course is saved in the database.

2. **Lesson Generation:**
   - When a user starts a lesson, the app generates detailed lesson content and a quiz using OpenAI, based on the course and lesson context.
   - Lessons are stored in the database and can be revisited.

3. **Course & Lesson Display:**
   - Courses are displayed as cards ([`CourseCard`](src/components/modules/course/course-card.tsx)), showing title, description, sections, lesson count, and duration.
   - Users can view course details, see section previews, and continue learning.

4. **Quiz & Progress:**
   - Each lesson includes a quiz to test understanding.
   - User progress is tracked, and lessons can be marked as completed.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Radix UI, Lucide Icons
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL
- **AI Integration:** OpenAI API for course and lesson generation
- **Authentication:** Clerk
- **Other:** Zod (validation), react-markdown, react-syntax-highlighter

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- [OpenAI API Key](https://platform.openai.com/)
- [Clerk API Keys](https://clerk.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/edumentor.git
   cd edumentor