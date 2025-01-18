CREATE TABLE `callback_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`product_id` int,
	`name` varchar(512) NOT NULL,
	`phone_number` varchar(15) NOT NULL,
	`created_at` timestamp NOT NULL,
	`processed` boolean,
	CONSTRAINT `callback_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `price_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL,
	`content` text,
	`price` smallint NOT NULL,
	`period` date NOT NULL,
	CONSTRAINT `price_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_types` (
	`id` tinyint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`jsonSchema` json NOT NULL,
	`image` varchar(256),
	`entry_parent_id` tinyint,
	`created_at` timestamp NOT NULL,
	`edited_at` timestamp,
	CONSTRAINT `product_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_name` varchar(256) NOT NULL,
	`amount` real NOT NULL,
	`uom_id` smallint,
	`product_type_id` tinyint NOT NULL,
	`other_attributes` json,
	`main_item` boolean,
	`created_at` timestamp NOT NULL,
	`edited_at` timestamp,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`product_id` int NOT NULL,
	`content` text,
	`score` smallint NOT NULL,
	`created_at` timestamp NOT NULL,
	`edited_at` timestamp,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `unit_of_measures` (
	`id` smallint AUTO_INCREMENT NOT NULL,
	`full_name` varchar(256) NOT NULL,
	`short_name` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL,
	`edited_at` timestamp,
	CONSTRAINT `unit_of_measures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`email` varchar(256) NOT NULL,
	`token` varchar(128) NOT NULL,
	`created_at` timestamp NOT NULL,
	CONSTRAINT `password_reset_tokens_email` PRIMARY KEY(`email`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` smallint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(256),
	`last_name` varchar(256),
	`email` varchar(256) NOT NULL,
	`email_verified_at` timestamp,
	`password` varchar(256) NOT NULL,
	`role_id` smallint,
	`created_at` timestamp NOT NULL,
	`edited_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `callback_requests` ADD CONSTRAINT `callback_requests_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `callback_requests` ADD CONSTRAINT `callback_requests_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_history` ADD CONSTRAINT `price_history_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_types` ADD CONSTRAINT `product_types_entry_parent_id_product_types_id_fk` FOREIGN KEY (`entry_parent_id`) REFERENCES `product_types`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_uom_id_unit_of_measures_id_fk` FOREIGN KEY (`uom_id`) REFERENCES `unit_of_measures`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_product_type_id_product_types_id_fk` FOREIGN KEY (`product_type_id`) REFERENCES `product_types`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE set null ON UPDATE no action;