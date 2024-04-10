ALTER TABLE "user" ADD COLUMN "telegram_username" varchar;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_telegram_username_unique" UNIQUE("telegram_username");