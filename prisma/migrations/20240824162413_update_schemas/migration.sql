/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `number_of_sections` on the `Simulator` table. All the data in the column will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `optionId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_simulatorId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "sectionId";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "optionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Simulator" DROP COLUMN "number_of_sections";

-- DropTable
DROP TABLE "Section";
