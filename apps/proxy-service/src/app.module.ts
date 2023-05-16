import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AppService } from './app.service';
import { ReverseProxyAuthMiddleware } from './proxy.auth.middleware';
import { ReverseProxyRestaurantMiddleware } from './proxy.restaurant.middleware';
import { ReverseProxyDeliveryMiddleware } from './proxy.delivery.middleware';
import { ReverseProxyOrderMiddleware } from './proxy.order.middleware';
import { ReverseProxyCartMiddleware } from './proxy.cart.middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyAuthMiddleware)
      .forRoutes({ path: 'v1/auth-service/*', method: RequestMethod.ALL });

    consumer
      .apply(ReverseProxyCartMiddleware)
      .forRoutes({ path: 'v1/cart-service/*', method: RequestMethod.ALL });

    consumer.apply(ReverseProxyRestaurantMiddleware).forRoutes({
      path: 'v1/restaurant-service/*',
      method: RequestMethod.ALL,
    });

    consumer.apply(ReverseProxyDeliveryMiddleware).forRoutes({
      path: 'v1/delivery-service/*',
      method: RequestMethod.ALL,
    });

    consumer.apply(ReverseProxyOrderMiddleware).forRoutes({
      path: 'v1/order-service/*',
      method: RequestMethod.ALL,
    });
  }
}
