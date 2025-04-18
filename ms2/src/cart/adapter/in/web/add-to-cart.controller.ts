import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddToCartItemCommandRequest } from '../command/add-to-cart-item.command.request';
import { AddToCartCommandRequest } from '../command/add-to-cart.command.request';
import { AddToCartUseCase } from '../../../application/port/in/add-to-cart.usecase';

/**
 * APIのエンドポイント
 */
@Controller('add-to-cart')
export class AddToCartController {
  // APIが実行すべきユースケースをDIする
  constructor(
    @Inject('AddToCartService') private readonly addToCartService: AddToCartUseCase
  ) {}

  @MessagePattern('dbserver1.ms_db.cart_items')
  async handleCartItemsEvent(@Payload() message: any) {
    const { payload } = message;

    // 例：データの種類を判定
    if (payload.op === 'c') {
      const [cmd, cmdError] = AddToCartItemCommandRequest.createCommand(
        payload.after.id,
        payload.after.sku_code,
        payload.after.price,
        payload.after.quantity,
        payload.after.cart_id
      );
      // このエラーはバリデーションエラー
      if (cmdError) {
        // @TODO エラーレスポンスを返す
        return;
      }
  
      // ユースケースを実行
      const error = await this.addToCartService.addCartItem(cmd);
      console.log('Received CDC event Cart Item Created:', payload.after);
    }
  }

  @MessagePattern('dbserver1.ms_db.carts')
  async handleCartsEvent(@Payload() message: any) {
    const { payload } = message;

    // 例：データの種類を判定
    if (payload.op === 'c') {
      const [cmd, cmdError] = AddToCartCommandRequest.createCommand(
        payload.after.id,
        payload.after.user_uuid,
        payload.after.cart_code,
      );
      // このエラーはバリデーションエラー
      if (cmdError) {
        // @TODO エラーレスポンスを返す
        return;
      }

      // ユースケースを実行
      const error = await this.addToCartService.addItem(cmd);
      console.log('Received CDC event Cart Created:', payload.after);
    }
  }
}
