import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AddToCartCommandRequest } from '../command/add-to-cart.command.request';
import { AddToCartUseCase } from '../../../application/port/in/add-to-cart.usecase';

/**
 * APIのエンドポイント
 */
@Controller('add-to-cart')
export class AddToCartController {
  // APIが実行すべきユースケースをDIする
  constructor(
    @Inject('AddToCartService') private readonly addToCartService: AddToCartUseCase,
  ) {}

  @Post()
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
}
