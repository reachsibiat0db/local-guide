/*
  Warnings:

  - You are about to drop the column `severity` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `sentiment` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "severity",
DROP COLUMN "type",
ADD COLUMN     "sentiment" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PlaceSummary" (
    "placeId" INTEGER NOT NULL,
    "positiveCount" INTEGER NOT NULL DEFAULT 0,
    "negativeCount" INTEGER NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3),
    "localsSay" TEXT,

    CONSTRAINT "PlaceSummary_pkey" PRIMARY KEY ("placeId")
);

-- AddForeignKey
ALTER TABLE "PlaceSummary" ADD CONSTRAINT "PlaceSummary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
