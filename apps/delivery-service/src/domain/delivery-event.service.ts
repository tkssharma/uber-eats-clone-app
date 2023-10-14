import { Injectable } from "@nestjs/common";
import { DeliveryEntity } from "./delivery.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class DeliveryEventService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private deliveryRepo: Repository<DeliveryEntity>
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    //LOOK FOR DELIVERY PARTNER FROM REDIS AND ASSIGN
  }
}
