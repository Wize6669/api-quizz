/*
  Warnings:

  - You are about to drop the column `beneficios` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `costo` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `facilidadesPago` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `fechaFin` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `fechaInicio` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `horarios` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `regimen` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `temario` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `universidad` on the `Course` table. All the data in the column will be lost.
  - Added the required column `cost` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "beneficios",
DROP COLUMN "costo",
DROP COLUMN "facilidadesPago",
DROP COLUMN "fechaFin",
DROP COLUMN "fechaInicio",
DROP COLUMN "horarios",
DROP COLUMN "nombre",
DROP COLUMN "regimen",
DROP COLUMN "telefono",
DROP COLUMN "temario",
DROP COLUMN "universidad",
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "paymentOptions" TEXT[],
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "schedule" TEXT NOT NULL,
ADD COLUMN     "schedules" TEXT[],
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "syllabus" TEXT[],
ADD COLUMN     "university" TEXT NOT NULL;
