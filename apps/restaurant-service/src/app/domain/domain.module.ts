import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule } from "@eats/config";
import { AppLoggerModule } from "@eats/logger";
import { DBModule } from "@eats/database";
import { RestaurantAddressEntity } from "./restaurant/entity/restaurant.address.entity";
import { RestaurantDishEntity } from "./restaurant/entity/restaurant.dish.entity";
import { RestaurantEntity } from "./restaurant/entity/restaurant.entity";
import { RestaurantController } from "./restaurant/controller/restaurant.controller";
import { RestaurantService } from "./restaurant/services/restaurant.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { RestaurantDishService } from "./restaurant/services/restaurant.dish.service";
import { RestaurantDishController } from "./restaurant/controller/restaurant.dish.controller";
import { SearchModule } from "./search/search.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    SearchModule,
    AuthModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([RestaurantEntity, RestaurantDishEntity]),
    DBModule.forRoot({
      entities: [
        RestaurantAddressEntity,
        RestaurantEntity,
        RestaurantDishEntity,
      ],
    }),
    TerminusModule,
    AppLoggerModule,
    ConfigModule,
  ],

  controllers: [RestaurantController, RestaurantDishController],
  providers: [RestaurantService, RestaurantDishService],
})
export class DomainModule {}
