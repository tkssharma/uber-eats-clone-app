import { Injectable } from "@nestjs/common";
import { DeliveryEntity } from "./delivery.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@eats/config";
import { Like, Repository, QueryRunner } from "typeorm";

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryEntity)
    private deliveryRepo: Repository<DeliveryEntity>
  ) {}

  async registerDeliveryAssignTask({ order, order_id }: any) {
    const deliveryTask = await this.deliveryRepo.save({
      order_id: order_id,
      order,
      partner_assigned: false,
    });
    return deliveryTask;
  }
}
