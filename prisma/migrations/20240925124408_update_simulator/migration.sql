/*
  Warnings:

  - Added the required column `visibility` to the `Simulator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Simulator" ADD COLUMN     "visibility" BOOLEAN NOT NULL;
