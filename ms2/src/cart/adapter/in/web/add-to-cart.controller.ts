import { Controller, Param, Get, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartRepository } from '../../out/repository/cart.repository';

/**
 * APIのエンドポイント
 */
@Controller('get-to-cart')
export class AddToCartController {
  // APIが実行すべきユースケースをDIする
  constructor(
    @Inject('CartRepository') private readonly cartRepository: CartRepository,
  ) {}

  @Get()
  // @TODO 本来はもっと実装が必要
  public async getToCarts() {
    return this.cartRepository.findAll();
  }

  @Get(':userId')
  // @TODO 本来はもっと実装が必要
  public async getToCart(@Param('userId') id: number) {
    return this.cartRepository.findOne(id);
  }

  @MessagePattern('dbserver1.ms_db.cart_items')
  async handleCartItemsEvent(@Payload() message: any) {
    const { payload } = message;

    // 例：データの種類を判定
    if (payload.op === 'c') {
      this.cartRepository.saveCartItem({
        id: payload.after.id,
        skuCode: payload.after.sku_code,
        price: payload.after.price,
        quantity: payload.after.quantity,
        cartId: payload.after.cart_id,
      });
      console.log('Received CDC event Cart Item Created:', payload.after);
    } else if (payload.op === 'u') {
      console.log('Received CDC event Cart Item Updated:', payload.after);
    } else if (payload.op === 'd') {
      console.log('Received CDC event Cart Item Deleted:', payload.before);
    }
  }

  @MessagePattern('dbserver1.ms_db.carts')
  async handleCartsEvent(@Payload() message: any) {
    const { payload } = message;

    // 例：データの種類を判定
    if (payload.op === 'c') {
      this.cartRepository.saveCart({
        id: payload.after.id,
        userUuid: payload.after.user_uuid,
        cartCode: payload.after.cart_code,
      });
      console.log('Received CDC event Cart Created:', payload.after);
    } else if (payload.op === 'u') {
      console.log('Received CDC event Cart Updated:', payload.after);
    } else if (payload.op === 'd') {
      console.log('Received CDC event  CartDeleted:', payload.before);
    }
  }
}
