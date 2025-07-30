/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LessonContent" DROP CONSTRAINT "LessonContent_userId_fkey";

-- DropTable
DROP TABLE "public"."User";
