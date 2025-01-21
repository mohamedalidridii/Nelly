import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_role" AS ENUM('admin', 'patient');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_users_genre" AS ENUM('homme', 'femme');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_products_category" AS ENUM('ui_kits', 'icons');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_products_approved_for_sale" AS ENUM('pending', 'approved', 'denied');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_forms_confirmation_type" AS ENUM('message', 'redirect');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "enum_users_role" NOT NULL,
	"nom" varchar NOT NULL,
	"prenom" varchar NOT NULL,
	"tel" varchar NOT NULL,
	"genre" "enum_users_genre" NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"_verified" boolean,
	"_verificationtoken" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "users_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"products_id" integer,
	"product_files_id" integer
);

CREATE TABLE IF NOT EXISTS "products_images" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"price" numeric NOT NULL,
	"category" "enum_products_category",
	"approvedForSale" "enum_products_approved_for_sale",
	"price_id" varchar,
	"stripe_id" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "products_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer,
	"product_files_id" integer,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_card_url" varchar,
	"sizes_card_width" numeric,
	"sizes_card_height" numeric,
	"sizes_card_mime_type" varchar,
	"sizes_card_filesize" numeric,
	"sizes_card_filename" varchar,
	"sizes_tablet_url" varchar,
	"sizes_tablet_width" numeric,
	"sizes_tablet_height" numeric,
	"sizes_tablet_mime_type" varchar,
	"sizes_tablet_filesize" numeric,
	"sizes_tablet_filename" varchar
);

CREATE TABLE IF NOT EXISTS "media_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "product_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric
);

CREATE TABLE IF NOT EXISTS "product_files_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"_ispaid" boolean NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "orders_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer,
	"products_id" integer
);

CREATE TABLE IF NOT EXISTS "rendez_vous" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" varchar NOT NULL,
	"prenom" varchar NOT NULL,
	"rendez_vous" varchar NOT NULL,
	"date" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"default_value" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"message" jsonb,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" numeric,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"required" boolean,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "forms_emails" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"email_to" varchar,
	"cc" varchar,
	"bcc" varchar,
	"reply_to" varchar,
	"email_from" varchar,
	"subject" varchar NOT NULL,
	"message" jsonb
);

CREATE TABLE IF NOT EXISTS "forms" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"submit_button_label" varchar,
	"confirmationType" "enum_forms_confirmation_type",
	"confirmation_message" jsonb,
	"redirect_url" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"field" varchar NOT NULL,
	"value" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "form_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "form_submissions_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"forms_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "order_idx" ON "users_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "users_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "users_rels" ("path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "products_images" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "products_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "products" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "products_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "products_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "products_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "media" ("created_at");
CREATE INDEX IF NOT EXISTS "sizes_tablet_filename_idx" ON "media" ("sizes_tablet_filename");
CREATE INDEX IF NOT EXISTS "order_idx" ON "media_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "media_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "media_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "product_files" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "filename_idx" ON "product_files" ("filename");
CREATE INDEX IF NOT EXISTS "order_idx" ON "product_files_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "product_files_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "product_files_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "orders" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "orders_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "orders_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "orders_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "rendez_vous" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "forms_blocks_checkbox" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "forms_blocks_checkbox" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "forms_blocks_checkbox" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "forms_blocks_message" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "forms_blocks_message" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "forms_blocks_message" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "forms_blocks_number" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "forms_blocks_number" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "forms_blocks_number" ("_path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "forms_blocks_select_options" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "forms_blocks_select_options" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "forms_blocks_select" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "forms_blocks_select" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "forms_blocks_select" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "forms_blocks_text" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "forms_blocks_text" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "forms_blocks_text" ("_path");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "forms_emails" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "forms_emails" ("_parent_id");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "forms" ("created_at");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "form_submissions_submission_data" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "form_submissions_submission_data" ("_parent_id");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "form_submissions" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "form_submissions_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "form_submissions_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "form_submissions_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_product_files_id_product_files_id_fk" FOREIGN KEY ("product_files_id") REFERENCES "product_files"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_images" ADD CONSTRAINT "products_images__parent_id_products_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_files_id_product_files_id_fk" FOREIGN KEY ("product_files_id") REFERENCES "product_files"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "product_files_rels" ADD CONSTRAINT "product_files_rels_parent_id_product_files_id_fk" FOREIGN KEY ("parent_id") REFERENCES "product_files"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "product_files_rels" ADD CONSTRAINT "product_files_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "orders_rels" ADD CONSTRAINT "orders_rels_parent_id_orders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "orders_rels" ADD CONSTRAINT "orders_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "orders_rels" ADD CONSTRAINT "orders_rels_products_id_products_id_fk" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox__parent_id_forms_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message__parent_id_forms_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number__parent_id_forms_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options__parent_id_forms_blocks_select_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select__parent_id_forms_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text__parent_id_forms_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails__parent_id_forms_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data__parent_id_form_submissions_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "form_submissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_parent_id_form_submissions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "form_submissions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_forms_id_forms_id_fk" FOREIGN KEY ("forms_id") REFERENCES "forms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "users_rels";
DROP TABLE "products_images";
DROP TABLE "products";
DROP TABLE "products_rels";
DROP TABLE "media";
DROP TABLE "media_rels";
DROP TABLE "product_files";
DROP TABLE "product_files_rels";
DROP TABLE "orders";
DROP TABLE "orders_rels";
DROP TABLE "rendez_vous";
DROP TABLE "forms_blocks_checkbox";
DROP TABLE "forms_blocks_message";
DROP TABLE "forms_blocks_number";
DROP TABLE "forms_blocks_select_options";
DROP TABLE "forms_blocks_select";
DROP TABLE "forms_blocks_text";
DROP TABLE "forms_emails";
DROP TABLE "forms";
DROP TABLE "form_submissions_submission_data";
DROP TABLE "form_submissions";
DROP TABLE "form_submissions_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
