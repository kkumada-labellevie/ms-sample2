import { DeletedToCartStateEventMessage } from '../../port/out/deleted-to-cart-state.event.message';

/**
 * カートを削除した際のイベント
 * イベントカテゴリ: 状態転送
 */
export class DeletedToCartStateEvent {
  private constructor(
    private readonly cartId: number
  ) {}

  /**
   * 名前付きコンストラクタ
   *
   * @param cartId
   * @returns
   */
  public static occur(
    cartId: number
  ): DeletedToCartStateEvent {
    return new DeletedToCartStateEvent(cartId);
  }

  public get message(): DeletedToCartStateEventMessage {
    return {
      type: 'DELETED_TO_CART',
      cartId: this.cartId,
    };
  }
}
