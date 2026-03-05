/*
  Warnings:

  - A unique constraint covering the columns `[name,areaId,categoryId]` on the table `Place` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Place` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Place_name_areaId_key";

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "contact" TEXT;

-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "contact" TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Place_name_areaId_categoryId_key" ON "Place"("name", "areaId", "categoryId");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
