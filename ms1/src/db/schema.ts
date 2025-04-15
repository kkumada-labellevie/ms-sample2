import { mysqlTable, serial, varchar, int } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const carts = mysqlTable('carts', {
  id: serial('id').primaryKey(),
  userUuid: varchar('user_uuid', { length: 256 }),
  cartCode: varchar('cart_code', { length: 256 }),
});

export const cartsRelations = relations(carts, ({ many }) => ({
	cartItems: many(cartItems),
}));

export const cartItems = mysqlTable('cart_items', {
  id: serial('id').primaryKey(),
  skuCode: varchar('sku_code', { length: 256 }),
  price: int('price'),
  quantity: int('quantity'),
  cartId: int('cart_id').references(() => carts.id),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
	cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
}));
