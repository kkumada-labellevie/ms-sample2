import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';
import * as schema from './db/schema';

@Module({
  imports: [
    DrizzleMySqlModule.registerAsync({
      tag: 'DB_DEV',
      useFactory() {
        return {
          mysql: {
            connection: 'client',
            config: {
              host: 'ms2-mysql',
              port: 3306,
              user: 'admin',
              password: 'admin',
              database: 'ms_db',
            },
          },
          config: { schema: { ...schema }, mode: 'default' },
        };
      },
    }),
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
