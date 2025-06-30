-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "equipe" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "posicao" TEXT NOT NULL,
    "posicaoTitular" INTEGER,
    "timeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Time_equipe_key" ON "Time"("equipe");

-- CreateIndex
CREATE UNIQUE INDEX "Jogador_timeId_numero_key" ON "Jogador"("timeId", "numero");

-- AddForeignKey
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE CASCADE ON UPDATE CASCADE;
