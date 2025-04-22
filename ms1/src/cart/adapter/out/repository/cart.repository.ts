import { Injectable, Inject } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { SaveCartPort } from '../../../application/port/out/save-cart.port';
import { DeleteCartPort } from '../../../application/port/out/delete-cart.port';
import * as schema from '../../../../db/schema';

@Injectable()
export class CartRepository implements SaveCartPort, DeleteCartPort {
  constructor(
    @Inject('DB_DEV') private readonly drizzle: MySql2Database<typeof schema>,
  ) {}

  async save(cart: {
    userUuid: string;
    cartCode: string;
    items: { skuCode: string; price: number; quantity: number }[];
  }): Promise<void> {
    const carts = await this.drizzle
      .insert(schema.carts)
      .values({
        userUuid: cart.userUuid,
        cartCode: cart.cartCode,
      })
      .$returningId();

    for (const item of cart.items) {
      await this.drizzle
        .insert(schema.cartItems)
        .values({
          cartId: carts[0].id,
          ...item,
        });
    }

    console.log('Cart saved');
  }

  async deleteItem(cart: {
    cartId: number;
  }): Promise<void> {
    await this.drizzle
      .delete(schema.cartItems)
      .where(eq(schema.cartItems.cartId, cart.cartId));

    await this.drizzle
      .delete(schema.carts)
      .where(eq(schema.carts.id, cart.cartId));

    console.log('Cart deleted');
  }
}
