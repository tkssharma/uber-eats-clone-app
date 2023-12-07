import { Controller, Get } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import { DeliveryService } from "./domain/delivery.service";

@Controller("")
export class DeliveryController {
  constructor(
    private readonly health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private readonly service: DeliveryService
  ) {}

  @EventPattern("order_processed_success")
  async handleEventForOrder(data: Record<string, unknown>) {
    // access db table
    await this.service.registerDeliveryAssignTask(data);
    // get order
    // and assign user (delivery partner) from database to this order
  }
}
