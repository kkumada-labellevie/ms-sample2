import { ThisError } from '../../../../error/this-error';
import { GetToCartCommand } from './get-to-cart.command';

/**
 * 入力用ポート
 * カートを取得するというユースケースを表す
 * このインターフェイスを実装するのはドメイン層であり、アダプタ層は本インターフェイスを利用してユースケースを実行する
 */
export interface GetToCartUseCase {
  getItems(): Promise<void | ThisError>;
  getItem(cmd: GetToCartCommand): Promise<void | ThisError>;
}
