/*
  Warnings:

  - Added the required column `orderHeaderStateId` to the `OrderHeader` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderHeader" ADD COLUMN     "orderHeaderStateId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "OrderHeaderState" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OrderHeaderState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderHeader" ADD CONSTRAINT "OrderHeader_orderHeaderStateId_fkey" FOREIGN KEY ("orderHeaderStateId") REFERENCES "OrderHeaderState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
