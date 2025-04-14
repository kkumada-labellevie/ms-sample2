import { Injectable, Inject } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { SaveCartPort } from '../../../application/port/out/save-cart.port';
import * as schema from '../../../../db/schema';

@Injectable()
export class CartRepository implements SaveCartPort {
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
}
