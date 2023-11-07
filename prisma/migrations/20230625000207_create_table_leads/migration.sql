-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "contact" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "domains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
