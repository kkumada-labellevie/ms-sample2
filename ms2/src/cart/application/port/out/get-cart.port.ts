/**
 * 出力用ポート
 * アダプタが実装する
 */
export interface GetCartPort {
  findAll();
  findOne(id: number);
}
