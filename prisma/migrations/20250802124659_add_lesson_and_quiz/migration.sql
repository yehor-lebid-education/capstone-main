/*
  Warnings:

  - You are about to drop the `LessonContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LessonContent";

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "quiz" JSONB NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
