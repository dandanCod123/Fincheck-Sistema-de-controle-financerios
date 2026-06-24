/*
  Warnings:

  - You are about to drop the column `amount` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `name` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "amount",
DROP COLUMN "description",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
