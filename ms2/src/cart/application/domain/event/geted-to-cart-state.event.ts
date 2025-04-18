import { GetedToCartStateEventMessage } from '../../port/out/geted-to-cart-state.event.message';

/**
 * カートを取得した際のイベント
 * イベントカテゴリ: 状態転送
 */
export class GetedToCartStateEvent {
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
  ): GetedToCartStateEvent {
    return new GetedToCartStateEvent(userUuid, cartCode, item);
  }

  public get message(): GetedToCartStateEventMessage {
    return {
      type: 'GETED_TO_CART',
      userUuid: this.userUuid,
      cartCode: this.cartCode,
      item: this.item,
    };
  }
}
