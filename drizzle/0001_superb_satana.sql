ALTER TABLE "users" RENAME COLUMN "sms_code" TO "otp";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_activated" boolean DEFAULT false;