import { Injectable, Inject } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { FindCartPort } from 'src/cart/application/port/out/find-cart.port';
import { SaveCartPort } from '../../../application/port/out/save-cart.port';
import * as schema from '../../../../db/schema';

@Injectable()
export class CartRepository implements FindCartPort, SaveCartPort {
  constructor(
    @Inject('DB_DEV') private readonly drizzle: MySql2Database<typeof schema>,
  ) {}

  async findAll() {
    return await this.drizzle.query.carts.findMany({
      with: {
        cartItems: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.drizzle.query.carts.findFirst({
      with: {
        cartItems: true,
      },
      where(fields) {
        return eq(fields.id, id);
      },
    });
  }

  async save(cart: {
    userUuid: string;
    cartCode: string;
    items: { skuCode: string; price: number; quantity: number }[];
  }): Promise<void> {
    const { userUuid, cartCode, items } = cart;
    const carts = await this.drizzle
      .insert(schema.carts)
      .values({ userUuid, cartCode })
      .$returningId();

    for (const item of items) {
      await this.drizzle
        .insert(schema.cartItems)
        .values({
          cartId: carts[0].id,
          ...item,
        });
    }
  }

  async saveCart(cart: {
    id: number;
    userUuid: string;
    cartCode: string;
  }): Promise<void> {
    const carts = await this.drizzle
      .insert(schema.carts)
      .values({ ...cart });
  }

  async saveCartItem(cartItem: {
    id: number;
    skuCode: string;
    price: number;
    quantity: number;
    cartId: number;
  }): Promise<void> {
    await this.drizzle
      .insert(schema.cartItems)
      .values({ ...cartItem });
  }
}
