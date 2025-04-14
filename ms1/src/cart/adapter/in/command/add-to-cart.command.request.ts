import { ValidationError } from '../../../../error/validation-error';
import { AddToCartCommand } from '../../../application/port/in/add-to-cart.command';

/**
 * 外部からリクエストするためのコマンド
 * 入力用インターフェースを実装する
 */
export class AddToCartCommandRequest implements AddToCartCommand {
  private constructor(
    public readonly userUuid: string,
    public readonly cartCode: string,
    public readonly sku: { skuCode: string; price: number },
    public readonly quantity: number
) {}

  /**
   * コマンドを生成するための名前付きコンストラクタ
   * リクエストのため、バリデーションも行う
   *
   * @param userUuid
   * @param cartCode
   * @param sku
   * @param quantity
   * @returns
   */
  public static createCommand(
    userUuid: string,
    cartCode: string,
    sku: { skuCode: string; price: number },
    quantity: number
  ): [AddToCartCommand, null] | [null, ValidationError[]] {
    const errors: ValidationError[] = [];

    // バリデーション
    // バリデーションエラーは全て返す様にする
    // このエラーはログに残すことは考えていないが、呼び出し側が表示する可能性がある。
    // @TODO: バリデーションエラーに持たせるべき情報を考える
    if (!userUuid) {
      errors.push(new ValidationError('userUuid', 'userUuid is required'));
    }
    if (!cartCode) {
      errors.push(new ValidationError('cartCode', 'cartCode is required'));
    }
    if (!sku) {
      errors.push(new ValidationError('sku', 'sku is required'));
    }
    if (!sku.skuCode) {
      errors.push(new ValidationError('sku.skuCode', 'sku.skuCode is required'));
    }
    if (!sku.price) {
      errors.push(new ValidationError('sku.price', 'sku.price is required'));
    }
    if (!quantity) {
      errors.push(new ValidationError('quantity', 'quantity is required'));
    }
    else if (quantity <= 0) {
      errors.push(new ValidationError('quantity', 'quantity must be greater than 0'));
    }

    // バリデーションに1件でも引っかかればエラーとする
    if (errors.length > 0) {
      return [null, errors];
    }

    // エラーがない場合は、コマンドを含むTupleを返す
    return [new AddToCartCommandRequest(userUuid, cartCode, sku, quantity), null];
  }
}
