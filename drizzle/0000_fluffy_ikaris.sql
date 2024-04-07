CREATE TABLE IF NOT EXISTS "spot_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"spot_id" uuid,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"closed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spot_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"image" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"description" text,
	"location" varchar,
	"image" varchar,
	"type_id" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"phone_number" varchar(256),
	"email" varchar(256),
	"image" varchar,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "user_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"position" varchar(256),
	"description" text
);
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
