CREATE TABLE IF NOT EXISTS "localio_spot_subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer,
	"spot_id" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"closed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "localio_spots" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" text,
	"location" varchar,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "localio_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(256),
	"email" varchar(256),
	"password_hash" varchar,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "localio_user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer,
	"position" varchar(256),
	"interests" varchar(256),
	"contact_info" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "localio_spot_subscriptions" ADD CONSTRAINT "localio_spot_subscriptions_country_id_localio_users_id_fk" FOREIGN KEY ("country_id") REFERENCES "localio_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "localio_spot_subscriptions" ADD CONSTRAINT "localio_spot_subscriptions_spot_id_localio_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "localio_spots"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "localio_user_profiles" ADD CONSTRAINT "localio_user_profiles_country_id_localio_users_id_fk" FOREIGN KEY ("country_id") REFERENCES "localio_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
