import { ThisError } from '../../../../error/this-error';

/**
 * 出力用ポート
 * アダプタが実装する
 */
export interface SaveCartPort {
  save(cart: {
    userUuid: string;
    cartCode: string;
    items: { skuCode: string; price: number; quantity: number }[];
  }): Promise<void | ThisError>;
}
