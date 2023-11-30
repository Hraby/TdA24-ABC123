-- CreateTable
CREATE TABLE "Lecturer" (
    "uuid" TEXT NOT NULL,
    "title_before" TEXT,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "title_after" TEXT,
    "picture_url" TEXT,
    "location" TEXT,
    "claim" TEXT,
    "bio" TEXT,
    "price_per_hour" INTEGER,

    CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Tag" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lecturerUuid" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Contact_info" (
    "id" SERIAL NOT NULL,
    "telephone_numbers" TEXT[],
    "emails" TEXT[],
    "lecturerUuid" TEXT NOT NULL,

    CONSTRAINT "Contact_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_lecturerUuid_fkey" FOREIGN KEY ("lecturerUuid") REFERENCES "Lecturer"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact_info" ADD CONSTRAINT "Contact_info_lecturerUuid_fkey" FOREIGN KEY ("lecturerUuid") REFERENCES "Lecturer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
