-- CreateTable
CREATE TABLE "historyLeads" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "leadId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historyLeads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historyLeads" ADD CONSTRAINT "historyLeads_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
