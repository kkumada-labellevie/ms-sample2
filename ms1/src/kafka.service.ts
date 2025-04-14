import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export abstract class KafkaService implements OnModuleInit, OnModuleDestroy {
  public constructor(
    private readonly topicIds: string[],
    protected readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    // @TODO topic名等の管理については要検討
    for (const topicId of this.topicIds) {
      await this.kafkaClient.subscribeToResponseOf(topicId);
    }
    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }
}
