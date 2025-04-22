import { ThisError } from '../../../../error/this-error';
import { DeleteToCartCommand } from './delete-to-cart.command';

/**
 * 入力用ポート
 * カートに商品を追加するというユースケースを表す
 * このインターフェイスを実装するのはドメイン層であり、アダプタ層は本インターフェイスを利用してユースケースを実行する
 */
export interface DeleteToCartUseCase {
  deleteCartItem(cmd: DeleteToCartCommand): Promise<void | ThisError>;
  deleteItem(cmd: DeleteToCartCommand): Promise<void | ThisError>;
}
