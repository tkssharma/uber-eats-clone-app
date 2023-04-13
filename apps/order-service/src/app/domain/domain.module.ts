import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule } from "@eats/config";
import { AppLoggerModule } from "@eats/logger";
import { DBModule } from "@eats/database";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AuthModule } from "./auth/auth.module";
import { CartEntity } from "./cart/entity/cart.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartController } from "./cart/controller/cart.controller";
import { CartService } from "./cart/services/cart.service";

@Module({
  imports: [
    AuthModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([CartEntity]),
    DBModule.forRoot({
      entities: [CartEntity],
    }),
    TerminusModule,
    AppLoggerModule,
    ConfigModule,
  ],

  controllers: [CartController],
  providers: [CartService],
})
export class DomainModule {}
