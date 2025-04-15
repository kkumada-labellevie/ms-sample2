import { ThisError } from '../../../../error/this-error';

/**
 * 出力用ポート
 * アダプタが実装する
 */
export interface FindCartPort {
  findAll();

  findOne(id: number);
}
