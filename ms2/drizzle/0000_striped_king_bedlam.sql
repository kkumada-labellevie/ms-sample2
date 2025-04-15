CREATE TABLE `cart_items` (
	`id` serial AUTO_INCREMENT,
	`sku_code` varchar(256),
	`price` int,
	`quantity` int,
	`cart_id` int
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` serial AUTO_INCREMENT,
	`user_uuid` varchar(256),
	`cart_code` varchar(256)
);
--> statement-breakpoint
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cart_id_carts_id_fk` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE no action ON UPDATE no action;