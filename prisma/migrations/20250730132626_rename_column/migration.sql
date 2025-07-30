/*
  Warnings:

  - You are about to drop the column `data` on the `Course` table. All the data in the column will be lost.
  - Added the required column `sections` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Course" DROP COLUMN "data",
ADD COLUMN     "sections" JSONB NOT NULL;
