ALTER TABLE "user" RENAME COLUMN "first_name" TO "name";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerified" timestamp;