import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  OnModuleInit,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@eats/config";
import { Logger } from "@eats/logger";
import { Like, Repository, Connection, QueryRunner } from "typeorm";

import { NotFoundException } from "@nestjs/common";
import { OrderEntity } from "../entity/order.entity";

import { EventEmitter2 } from "@nestjs/event-emitter";
import {
  CreatePaymentBodyDto,
  Status,
  UpdateByIdDto,
  UpdateByIdQueryDto,
} from "../dto/order.dto";
import { UserMetaData } from "../../auth/guards/user";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class OrderService implements OnModuleInit {
  constructor(
    @Inject("ORDER_LISTENER_SERVICE") private readonly client: ClientProxy,
    private readonly logger: Logger,
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>
  ) {}

  async onModuleInit() {
    try {
      await this.client.connect();
    } catch (err) {
      console.log(err);
    }
  }

  async createOrder(user: UserMetaData, payload: CreatePaymentBodyDto) {
    const items = payload.menu_items;
    let totalAmount = 0;
    items.forEach((i) => {
      totalAmount = totalAmount + i.count * i.price;
    });
    return this.orderRepo.save({
      user_id: user.userId,
      amount: totalAmount,
      address: payload.address,
      restaurant: payload.restaurant,
      address_id: payload.address_id,
      restaurant_id: payload.restaurant_id,
      menu_items: payload.menu_items,
      order_status: "initiated",
      payment_status: "in_progress",
    });
  }

  async getLasProcessedOrder(user: UserMetaData) {
    // fetch last processed order for tracking and delivery
    const order = await this.orderRepo.findOne({
      where: {
        order_status: "payment_processed",
        user_id: user.userId,
      },
    });
    return order;
  }

  async confirmOrder(
    user: UserMetaData,
    param: UpdateByIdDto,
    query: UpdateByIdQueryDto
  ) {
    const order = await this.orderRepo.findOne({
      where: {
        id: param.id,
      },
    });

    if (!order) {
      throw new NotFoundException();
    }
    // update payment status to success or feailed for order Id
    order.payment_status = query.status;
    order.order_status =
      query.status === Status.success ? "payment_processed" : "payment_failed";
    const savedOrder = await order.save();

    if (Status.success === query.status) {
      this.client.emit<any>("order_processed_success", {
        order_id: savedOrder.id,
        order: savedOrder,
      });
    }
    return savedOrder;
  }
  async testRMQ() {
    // TESTING ONLY
    this.client.emit<any>("order_processed_success", {
      order_id: "UUID",
      order: {
        name: "TEST JSON PAYLOAD",
      },
    });
  }
}
