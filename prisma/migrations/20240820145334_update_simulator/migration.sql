/*
  Warnings:

  - Added the required column `number_questions` to the `Simulator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Simulator" ADD COLUMN     "number_questions" INTEGER NOT NULL,
ALTER COLUMN "navigate" DROP DEFAULT;
