-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "universidad" TEXT NOT NULL,
    "regimen" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "facilidadesPago" TEXT[],
    "temario" TEXT[],
    "beneficios" TEXT[],
    "telefono" TEXT NOT NULL,
    "horarios" TEXT[],

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
