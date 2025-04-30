import { Controller, Post, Delete, Body, Inject, HttpException, HttpStatus } from '@nestjs/common';
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
      throw new HttpException('Validation error', HttpStatus.BAD_REQUEST);
    }

    // ユースケースを実行
    const error = await this.addToCartService.addItem(cmd);
    if (error) {
      throw new HttpException('Failed to add item to cart', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete-to-cart')
  // @TODO 本来はもっと実装が必要
  public async deleteToCart(@Body() request: any) {
    const [cmd, cmdError] = DeleteToCartCommandRequest.createCommand(request.cartId);
    // このエラーはバリデーションエラー
    if (cmdError) {
      console.log(cmdError);
      throw new HttpException('Validation error', HttpStatus.BAD_REQUEST);
    }

    // ユースケースを実行
    const error = await this.deleteToCartService.deleteItem(cmd);
    if (error) {
      throw new HttpException('Failed to delete item from cart', HttpStatus.INTERNAL_SERVER_ERROR);
      // return {status: 'error', message: 'Failed to delete item from cart'};
      // throw new HttpException('Failed to delete item from cart', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  

  }
}
