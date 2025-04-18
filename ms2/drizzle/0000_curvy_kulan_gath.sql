CREATE TABLE `cart_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`sku_code` varchar(256),
	`price` int,
	`quantity` int,
	`cart_id` bigint unsigned,
	CONSTRAINT `cart_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_uuid` varchar(256),
	`cart_code` varchar(256),
	CONSTRAINT `carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cart_id_carts_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE no action ON UPDATE no action;