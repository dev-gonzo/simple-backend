-- CreateTable
CREATE TABLE "leadsPhone" (
    "id" SERIAL NOT NULL,
    "ddd" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "leadId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leadsPhone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leadsEmail" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "leadId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leadsEmail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leadsPhone" ADD CONSTRAINT "leadsPhone_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leadsEmail" ADD CONSTRAINT "leadsEmail_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
