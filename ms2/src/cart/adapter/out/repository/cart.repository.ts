import { Injectable, Inject } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { SaveCartPort } from '../../../application/port/out/save-cart.port';
import * as schema from '../../../../db/schema';

@Injectable()
export class CartRepository implements SaveCartPort {
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

  async saveCart(cart: {
    id: number;
    userUuid: string;
    cartCode: string;
  }): Promise<void> {
    const carts = await this.drizzle
      .insert(schema.carts)
      .values({
        id: cart.id,
        userUuid: cart.userUuid,
        cartCode: cart.cartCode,
      });

    console.log('Cart saved');
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
      .values({
        id: cartItem.id,
        skuCode: cartItem.skuCode,
        price: cartItem.price,
        quantity: cartItem.quantity,
        cartId: cartItem.cartId,
      });

    console.log('Cart Item saved');
  }
}
