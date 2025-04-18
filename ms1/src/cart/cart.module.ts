import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AddToCartService } from './application/domain/service/add-to-cart.service';
import { StockService } from './adapter/out/service/stock.service';
import { CartRepository } from './adapter/out/repository/cart.repository';
import { CartEventProducer } from './adapter/out/producer/cart-event.producer';
import { AddToCartController } from './adapter/in/web/add-to-cart.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cart-kafka1',
            brokers: ['broker1:9092', 'broker2:9093'],
          },
          consumer: {
            groupId: 'cart-consumer-group1',
          },
        },
      },
    ])
  ],
  controllers: [
    AddToCartController,
  ],
  providers: [
    {
      provide: 'AddToCartService',
      useClass: AddToCartService,
    },
    {
      provide: 'StockService',
      useClass: StockService,
    },
    {
      provide: 'CartRepository',
      useClass: CartRepository,
    },
    {
      provide: 'CartEventProducer',
      useClass: CartEventProducer,
    }
  ]
})
export class CartModule {}
