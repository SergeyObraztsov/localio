ALTER TABLE "spots" ALTER COLUMN "type_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "user_profiles" DROP COLUMN IF EXISTS "telegram_id";