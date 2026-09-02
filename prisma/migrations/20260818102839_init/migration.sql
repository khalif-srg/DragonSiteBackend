-- CreateTable
CREATE TABLE "Talent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Talent_pkey" PRIMARY KEY ("id")
);
