import { Inject, Injectable } from '@nestjs/common';
import { ThisError } from '../../../../error/this-error';
import { DeleteToCartUseCase } from '../../port/in/delete-to-cart.usecase';
import { DeleteToCartCommand } from '../../port/in/delete-to-cart.command';
import { DeleteCartPort } from '../../port/out/delete-cart.port';

/**
 * 入力Port（DeleteToCartUsecase）を実装しているサービス
 */
@Injectable()
export class DeleteToCartService implements DeleteToCartUseCase {
  // Interfaceを利用してDIしているので、下記の様な記述が必要となる
  public constructor(
    @Inject('CartRepository') private readonly cartRepository: DeleteCartPort
  ) {}

  /**
   * Cartを削除する
   * @param cmd
   * @returns
   */
  public async deleteItem(cmd: DeleteToCartCommand): Promise<void | ThisError> {
    // 削除対象のCartを取得する
    const cart = await this.cartRepository.findOne(cmd.cartId);
    // Cartが見つからない場合はエラーを返す
    if (!cart) {
      // return new Exception('カートが見つかりません');
      return ThisError.invalidArgumentError('削除対象のカートが見つかりません。');
    }
    // Cartを削除する
    await this.cartRepository.deleteItem({
      cartId: cmd.cartId,
    });
  }
}
