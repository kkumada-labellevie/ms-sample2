import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaService } from '../../../../kafka.service';
import { ThisError } from '../../../../error/this-error';
import { AddedToCartStateEventMessage } from '../../../application/port/out/added-to-cart-state.event.message';
import { CartEventProducerPort } from '../../../application/port/out/cart-event-producer.port';

/**
 * KafkaのトピックID
 * 別の場所でまとめて定義しておく方が良いと考えている
 */
const topicIds = {
  ADDED_TO_CART: 'dbserver1.public.carts',
};

/**
 * カートイベントをKafkaに送信するProducer
 */
@Injectable()
export class CartEventProducer extends KafkaService implements CartEventProducerPort {
  public constructor(
    @Inject('KAFKA_SERVICE') kafkaClient: ClientKafka
  ) {
    super([topicIds.ADDED_TO_CART], kafkaClient);
  }

  public async publish(message: AddedToCartStateEventMessage): Promise<void | ThisError> {}
}
