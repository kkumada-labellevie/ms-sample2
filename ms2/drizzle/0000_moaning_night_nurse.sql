CREATE TABLE "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_uuid" varchar(256),
	"cart_code" varchar(256)
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"sku_code" varchar(256),
	"price" integer,
	"quantity" integer,
	"cart_id" bigint
);
--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE no action ON UPDATE no action;