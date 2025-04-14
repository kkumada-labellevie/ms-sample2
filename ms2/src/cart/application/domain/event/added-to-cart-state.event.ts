import { AddedToCartStateEventMessage } from '../../port/out/added-to-cart-state.event.message';

/**
 * カートに商品を追加した際のイベント
 * イベントカテゴリ: 状態転送
 */
export class AddedToCartStateEvent {
  private constructor(
    private readonly userUuid: string,
    private readonly cartCode: string,
    private readonly item: {
      skuCode: string;
      price: number;
      quantity: number;
    }
  ) {}

  /**
   * 名前付きコンストラクタ
   *
   * @param userUuid
   * @param cartCode
   * @param item
   * @returns
   */
  public static occur(
    userUuid: string,
    cartCode: string,
    item: { skuCode: string; price: number; quantity: number }
  ): AddedToCartStateEvent {
    return new AddedToCartStateEvent(userUuid, cartCode, item);
  }

  public get message(): AddedToCartStateEventMessage {
    return {
      type: 'ADDED_TO_CART',
      userUuid: this.userUuid,
      cartCode: this.cartCode,
      item: this.item,
    };
  }
}
