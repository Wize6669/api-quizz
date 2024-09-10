/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - Added the required column `statement` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statement` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "imageUrl",
DROP COLUMN "text",
ADD COLUMN     "imageName" TEXT,
ADD COLUMN     "statement" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "imageUrl",
DROP COLUMN "text",
ADD COLUMN     "imageName" TEXT,
ADD COLUMN     "statement" TEXT NOT NULL;
