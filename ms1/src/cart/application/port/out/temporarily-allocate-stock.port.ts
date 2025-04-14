import { ThisError } from '../../../../error/this-error';

/**
 * 出力用ポート
 * アダプタが実装する
 */
export interface TemporarilyAllocateStockPort {
  tempAllocateStock(skuCode: string, price: number, quantity: number): Promise<void | ThisError>;
}
