import { ThisError } from '../../../../error/this-error';
import { AddToCartCommand } from './add-to-cart.command';
import { AddToCartItemCommand } from './add-to-cart-item.command';

/**
 * 入力用ポート
 * カートに商品を追加するというユースケースを表す
 * このインターフェイスを実装するのはドメイン層であり、アダプタ層は本インターフェイスを利用してユースケースを実行する
 */
export interface AddToCartUseCase {
  addCartItem(cmd: AddToCartItemCommand): Promise<void | ThisError>;
  addItem(cmd: AddToCartCommand): Promise<void | ThisError>;
}
