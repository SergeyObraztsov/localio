CREATE TABLE IF NOT EXISTS "spot_subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"spot_id" uuid,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"closed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spot_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"description" text,
	"location" varchar,
	"type_id" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(256),
	"last_name" varchar(256),
	"phone_number" varchar(256),
	"sms_code" varchar(4),
	"email" varchar(256),
	"image" varchar,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"position" varchar(256),
	"telegram_chat_id" varchar(256),
	"telegram_id" varchar(256),
	"telegram_username" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spot_subscriptions" ADD CONSTRAINT "spot_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spot_subscriptions" ADD CONSTRAINT "spot_subscriptions_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "spots"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spots" ADD CONSTRAINT "spots_type_id_spot_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "spot_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
