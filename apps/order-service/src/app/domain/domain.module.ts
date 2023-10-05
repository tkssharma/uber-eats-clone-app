import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule } from "@eats/config";
import { AppLoggerModule } from "@eats/logger";
import { DBModule } from "@eats/database";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AuthModule } from "./auth/auth.module";
import { OrderEntity } from "./order/entity/order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./order/controller/order.controller";
import { OrderService } from "./order/services/order.service";

@Module({
  imports: [
    AuthModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([OrderEntity]),
    DBModule.forRoot({
      entities: [OrderEntity],
    }),
    TerminusModule,
    AppLoggerModule,
    ConfigModule,
  ],

  controllers: [OrderController],
  providers: [OrderService],
})
export class DomainModule {}
