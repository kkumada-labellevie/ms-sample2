import { Controller, Post, Delete, Body, Inject } from '@nestjs/common';
import { AddToCartCommandRequest } from '../command/add-to-cart.command.request';
import { DeleteToCartCommandRequest } from '../command/delete-to-cart.command.request';
import { AddToCartUseCase } from '../../../application/port/in/add-to-cart.usecase';
import { DeleteToCartUseCase } from '../../../application/port/in/delete-to-cart.usecase';

/**
 * APIのエンドポイント
 */
@Controller()
export class CartController {
  // APIが実行すべきユースケースをDIする
  constructor(
    @Inject('AddToCartService') private readonly addToCartService: AddToCartUseCase,
    @Inject('DeleteToCartService') private readonly deleteToCartService: DeleteToCartUseCase
  ) {}

  @Post('add-to-cart')
  // @TODO 本来はもっと実装が必要
  public async addToCart(@Body() request: any): Promise<void> {
    const [cmd, cmdError] = AddToCartCommandRequest.createCommand(
      request.userUuid,
      request.cartCode,
      request.sku,
      request.quantity,
    );
    // このエラーはバリデーションエラー
    if (cmdError) {
      // @TODO エラーレスポンスを返す
      return
    }

    // ユースケースを実行
    const error = await this.addToCartService.addItem(cmd);
  }

  @Delete('delete-to-cart')
  // @TODO 本来はもっと実装が必要
  public async deleteToCart(@Body() request: any): Promise<void> {
    const [cmd, cmdError] = DeleteToCartCommandRequest.createCommand(request.cartId);
    // このエラーはバリデーションエラー
    if (cmdError) {
      // @TODO エラーレスポンスを返す
      return
    }

    // ユースケースを実行
    const error = await this.deleteToCartService.deleteItem(cmd);
  }
}
