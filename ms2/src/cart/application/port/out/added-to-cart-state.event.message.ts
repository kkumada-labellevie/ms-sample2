/**
 * Kafkaに送信するメッセージの形式
 * イベントカテゴリを明示的にしておくことで、どういった特性のメッセージなのかをはっきりさせる
 */
export interface AddedToCartStateEventMessage {
  type: string,
  userUuid: string,
  cartCode: string,
  item: {
    skuCode: string;
    price: number;
    quantity: number;
  }
}
