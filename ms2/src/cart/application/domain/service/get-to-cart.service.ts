import { Inject, Injectable } from '@nestjs/common';
import { ThisError } from '../../../../error/this-error';
import { GetToCartUseCase } from '../../port/in/get-to-cart.usecase';
import { GetToCartCommand } from '../../port/in/get-to-cart.command';
import { GetCartPort } from '../../port/out/get-cart.port';

/**
 * 入力Port（GetToCartUsecase）を実装しているサービス
 */
@Injectable()
export class GetToCartService implements GetToCartUseCase {
  // Interfaceを利用してDIしているので、下記の様な記述が必要となる
  public constructor(
    @Inject('CartRepository') private readonly cartRepository: GetCartPort
  ) {}

  /**
   * Cart一覧を取得する
   * @returns
   */
  public async getItems(): Promise<void | ThisError> {
    return await this.cartRepository.findAll();
  }

  /**
   * Cartを取得する
   * @param cmd
   * @returns
   */
  public async getItem(cmd: GetToCartCommand): Promise<void | ThisError> {
    return await this.cartRepository.findOne(cmd.cartId);
  }
}
