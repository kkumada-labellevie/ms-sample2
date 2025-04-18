import { Controller, Param, Get, Inject } from '@nestjs/common';
import { GetToCartCommandRequest } from '../command/get-to-cart.command.request';
import { GetToCartUseCase } from '../../../application/port/in/get-to-cart.usecase';

/**
 * APIのエンドポイント
 */
@Controller('get-to-cart')
export class GetToCartController {
  // APIが実行すべきユースケースをDIする
  constructor(
    @Inject('GetToCartService') private readonly getToCartService: GetToCartUseCase
  ) {}

  @Get()
  // @TODO 本来はもっと実装が必要
  public async getToCarts() {
    return this.getToCartService.getItems();
  }

  @Get(':userId')
  // @TODO 本来はもっと実装が必要
  public async getToCart(@Param('userId') id: number) {
    const [cmd, cmdError] = GetToCartCommandRequest.createCommand(id);
    // このエラーはバリデーションエラー
    if (cmdError) {
      // @TODO エラーレスポンスを返す
      return
    }

    return this.getToCartService.getItem(cmd)
  }
}
