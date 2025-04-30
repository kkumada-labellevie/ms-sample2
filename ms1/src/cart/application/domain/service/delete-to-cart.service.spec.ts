import { Test, TestingModule } from '@nestjs/testing';
import { DeleteToCartService } from './delete-to-cart.service';
import { DeleteToCartCommand } from '../../port/in/delete-to-cart.command';
import { DeleteCartPort } from '../../port/out/delete-cart.port';
import { ThisError } from '../../../../error/this-error';

class CartRepositoryMock implements DeleteCartPort {
  async deleteItem(cart: {
    cartId: number;
  }): Promise<void | ThisError> {
    return;
  }
  async findOne(
    id: number,
  ): Promise<void | ThisError> {
    return;
  }
}

describe('DeleteToCartService（ドメインサービス）', () => {
  describe('#deleteItem', () => {
    let sut: DeleteToCartService;
    let cr: DeleteCartPort;
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DeleteToCartService,
          {
            provide: 'CartRepository',
            useClass: CartRepositoryMock
          },
        ],
      }).compile();

      sut = module.get<DeleteToCartService>(DeleteToCartService);
      cr = module.get<DeleteCartPort>('CartRepository');
    });

    test('カートから商品を削除できた', async () => {
      const cmd: DeleteToCartCommand = {
        cartId: 1,
      };
      const crSpyFindOne = jest.spyOn(cr, 'findOne').mockResolvedValueOnce({});
      const crSpyDeleteItem = jest.spyOn(cr, 'deleteItem');

      const error = await sut.deleteItem(cmd);

      expect(error).toBeUndefined();
      expect(crSpyFindOne).toHaveBeenCalledTimes(1);
      expect(crSpyDeleteItem).toHaveBeenCalledTimes(1);
    });

    test('カートから商品を取得できない', async () => {
      const cmd: DeleteToCartCommand = {
        cartId: 1,
      };
      const crSpyFindOne = jest.spyOn(cr, 'findOne').mockResolvedValueOnce(undefined);

      const error = await sut.deleteItem(cmd);

      expect(error).toBeInstanceOf(ThisError);
      expect(error?.message).toBe('削除対象のカートが見つかりません。');    
      expect(crSpyFindOne).toHaveBeenCalledTimes(1);
    });
  });
});
