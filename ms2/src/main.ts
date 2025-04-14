import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'cart-kafka2',
        brokers: ['broker1:9092', 'broker2:9093'],
      },
      consumer: {
        groupId: 'cart-consumer-group2',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3010);
}
bootstrap();
