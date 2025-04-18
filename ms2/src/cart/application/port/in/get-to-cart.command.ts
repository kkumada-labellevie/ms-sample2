/**
 * コマンドのインターフェース
 * このコマンドは、カートを取得するために使用される
 * コマンドはアダプタに実装される（外部からリクエストされるものであるため）
 */
export interface GetToCartCommand {
  cartId: number;
}
