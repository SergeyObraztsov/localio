ALTER TABLE "spot" ADD CONSTRAINT "spot_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_unique" UNIQUE("user_id");