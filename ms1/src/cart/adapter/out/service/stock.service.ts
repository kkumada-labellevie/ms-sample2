import { ThisError } from '../../../../error/this-error';
import { TemporarilyAllocateStockPort } from '../../../application/port/out/temporarily-allocate-stock.port';

export class StockService implements TemporarilyAllocateStockPort {
  public async tempAllocateStock(skuCode: string, price: number, quantity: number): Promise<void | ThisError> {
    return;
  }
}
