/**
 * コマンドのインターフェース
 * このコマンドは、カートに商品を追加するために使用される
 * コマンドはアダプタに実装される（外部からリクエストされるものであるため）
 */
export interface AddToCartCommand {
  userUuid: string;
  cartCode: string;
  sku: { skuCode: string; price: number };
  quantity: number;
}
