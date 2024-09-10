/*
  Warnings:

  - The primary key for the `Simulator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `navigate` on the `Simulator` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_simulatorId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "simulatorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Simulator" DROP CONSTRAINT "Simulator_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "navigate",
ADD COLUMN     "navigate" BOOLEAN NOT NULL,
ADD CONSTRAINT "Simulator_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Simulator_id_seq";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_simulatorId_fkey" FOREIGN KEY ("simulatorId") REFERENCES "Simulator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
