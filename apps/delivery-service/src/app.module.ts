import { CacheModule, CacheStore, Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { mainModule } from "process";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DBModule } from "@eats/database";
import { DeliveryEntity } from "./domain/delivery.entity";
import { DeliveryService } from "./domain/delivery.service";
import { DeliveryController } from "./delivery.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { DeliveryEventService } from "./domain/delivery-event.service";
import HttpClientService from "./lib/http.client.service";
import { UserProxyService } from "./domain/user.http.service";
@Module({
  imports: [
    TerminusModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([DeliveryEntity]),
    DBModule.forRoot({
      entities: [DeliveryEntity],
    }),
  ],
  controllers: [AppController, DeliveryController],
  providers: [
    AppService,
    DeliveryService,
    DeliveryEventService,
    UserProxyService,
    HttpClientService,
  ],
})
export class AppModule {}
