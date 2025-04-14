import { Test, TestingModule } from '@nestjs/testing';
import { AddToCartService } from './add-to-cart.service';
import { AddToCartCommand } from '../../port/in/add-to-cart.command';
import { TemporarilyAllocateStockPort } from '../../port/out/temporarily-allocate-stock.port';
import { SaveCartPort } from '../../port/out/save-cart.port';
import { CartEventProducerPort } from '../../port/out/cart-event-producer.port';
import { ThisError } from '../../../../error/this-error';

class StockServiceMock implements TemporarilyAllocateStockPort {
  async tempAllocateStock(skuCode: string, quantity: number): Promise<void | ThisError> {
    switch(skuCode) {
      case 'success-sku-code':
        return;
      case 'error-sku-code':
        return new ThisError('error-sku-code', 'error-sku-code');
    }
  }
}

class CartRepositoryMock implements SaveCartPort {
  async save(cart: {
    userUuid: string;
    cartCode: string;
    items: { skuCode: string; price: number; quantity: number }[];
  }): Promise<void | ThisError> {
    return;
  }
}

class CartEventProducerMock implements CartEventProducerPort {
  async publish<E>(event: E): Promise<void | ThisError> {
    return;
  }
}


describe('AddToCartService（ドメインサービス）', () => {
  describe('#addItem', () => {
    let sut: AddToCartService;
    let ss: TemporarilyAllocateStockPort;
    let cr: SaveCartPort;
    let cep: CartEventProducerPort;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AddToCartService,
          {
            provide: 'StockService',
            useClass: StockServiceMock
          },
          {
            provide: 'CartRepository',
            useClass: CartRepositoryMock
          },
          {
            provide: 'CartEventProducer',
            useClass: CartEventProducerMock
          }
        ],
      }).compile();

      sut = module.get<AddToCartService>(AddToCartService);
      ss = module.get<TemporarilyAllocateStockPort>('StockService');
      cr = module.get<SaveCartPort>('CartRepository');
      cep = module.get<CartEventProducerPort>('CartEventProducer');
    });

    test('カートに商品を追加できた', async () => {
      const cmd: AddToCartCommand = {
        userUuid: 'user_uuid',
        cartCode: '69e0680aaf63792ed09be1dd0700490417b8e8cb687d0366149f7472b8e0d092',
        sku: { skuCode: 'success-sku-code', price: 1000 },
        quantity: 1
      };
      const ssSpy = jest.spyOn(ss, 'tempAllocateStock');
      const crSpy = jest.spyOn(cr, 'save');
      const cepSpy = jest.spyOn(cep, 'publish');

      const error = await sut.addItem(cmd);

      expect(error).toBeUndefined();
      expect(ssSpy).toHaveBeenCalledTimes(1);
      expect(crSpy).toHaveBeenCalledTimes(1);
      expect(cepSpy).toHaveBeenCalledTimes(1);
    });
  });
});
