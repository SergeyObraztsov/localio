ALTER TABLE "spot_subscriptions" RENAME TO "spot_subscription";--> statement-breakpoint
ALTER TABLE "spot_types" RENAME TO "spot_type";--> statement-breakpoint
ALTER TABLE "spots" RENAME TO "spot";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user_profiles" RENAME TO "user_profile";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_phone_number_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "spot_subscription" DROP CONSTRAINT "spot_subscriptions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "spot_subscription" DROP CONSTRAINT "spot_subscriptions_spot_id_spots_id_fk";
--> statement-breakpoint
ALTER TABLE "spot" DROP CONSTRAINT "spots_type_id_spot_types_id_fk";
--> statement-breakpoint
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profiles_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spot_subscription" ADD CONSTRAINT "spot_subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spot_subscription" ADD CONSTRAINT "spot_subscription_spot_id_spot_id_fk" FOREIGN KEY ("spot_id") REFERENCES "spot"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spot" ADD CONSTRAINT "spot_type_id_spot_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "spot_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_phone_number_unique" UNIQUE("phone_number");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");