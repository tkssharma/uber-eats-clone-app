import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { ConfigModule } from "@eats/config";
import { Logger } from "./logger";
import { LoggerMiddleware } from "./logger.middleware";

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppLoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
