import { Inject, Injectable } from '@nestjs/common';
import { ThisError } from '../../../../error/this-error';
import { AddToCartUseCase } from '../../port/in/add-to-cart.usecase';
import { AddToCartItemCommand } from '../../port/in/add-to-cart-item.command';
import { AddToCartCommand } from '../../port/in/add-to-cart.command';
import { SaveCartPort } from '../../port/out/save-cart.port';

/**
 * 入力Port（AddToCartUsecase）を実装しているサービス
 */
@Injectable()
export class AddToCartService implements AddToCartUseCase {
  // Interfaceを利用してDIしているので、下記の様な記述が必要となる
  public constructor(
    @Inject('CartRepository') private readonly cartRepository: SaveCartPort
  ) {}

  /**
   * CartItemに商品を追加する
   * @param cmd
   * @returns
   */
  public async addCartItem(cmd: AddToCartItemCommand): Promise<void | ThisError> {
    await this.cartRepository.saveCartItem({
      id: cmd.id,
      skuCode: cmd.skuCode,
      price: cmd.price,
      quantity: cmd.quantity,
      cartId: cmd.cartId,
    });
  }

  /**
   * Cartに商品を追加する
   * @param cmd
   * @returns
   */
  public async addItem(cmd: AddToCartCommand): Promise<void | ThisError> {
    await this.cartRepository.saveCart({
      id: cmd.id,
      userUuid: cmd.userUuid,
      cartCode: cmd.cartCode,
    });
  }
}
