import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule } from "@eats/config";
import { AppLoggerModule } from "@eats/logger";
import { DBModule } from "@eats/database";

import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { CartEntity } from "./cart/entity/cart.entity";
import { CartController } from "./cart/controller/cart.controller";
import { CartService } from "./cart/services/cart.service";
import { AuthModule } from "./auth/auth.module";
import { PaymentEntity } from "./payment/entity/payment.entity";
import { PaymentController } from "./payment/controller/payment.controller";
import { PaymentService } from "./payment/services/payment.service";
@Module({
  imports: [
    AuthModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([CartEntity, PaymentEntity]),
    DBModule.forRoot({
      entities: [CartEntity, PaymentEntity],
    }),
    TerminusModule,
    AppLoggerModule,
    ConfigModule,
  ],
  controllers: [CartController, PaymentController],
  providers: [CartService, PaymentService],
})
export class DomainModule {}
