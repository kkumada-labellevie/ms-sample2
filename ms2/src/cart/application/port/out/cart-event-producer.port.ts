import { ThisError } from '../../../../error/this-error';
import { AddedToCartStateEventMessage } from '../../../application/port/out/added-to-cart-state.event.message';

/**
 * 出力用ポート
 * アダプタが実装する
 */
export interface CartEventProducerPort {
  publish(message: AddedToCartStateEventMessage): Promise<void | ThisError>;
}
