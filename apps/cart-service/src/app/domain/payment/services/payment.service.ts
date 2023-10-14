import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "@eats/logger";
import { Repository } from "typeorm";
import Stripe from "stripe";

import { NotFoundException } from "@nestjs/common";
import { PaymentEntity } from "../entity/payment.entity";

import {
  CreatePaymentBodyDto,
  UpdateByIdDto,
  UpdateByIdQueryDto,
  UpdatePaymentBodyDto,
} from "../dto/payment.dto";
import { UserMetaData } from "../../auth/guards/user";

@Injectable()
export class PaymentService implements OnModuleInit {
  private stripe: any;
  constructor(
    private readonly logger: Logger,
    @InjectRepository(PaymentEntity)
    private payRepo: Repository<PaymentEntity>
  ) {
    this.stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!, {
      apiVersion: "2023-08-16",
    });
  }
  async onModuleInit() {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async updatePayment(user: UserMetaData, payload: UpdatePaymentBodyDto) {
    if (!payload) {
      throw new NotFoundException();
    }
    const payment = await this.payRepo.findOne({
      where: {
        order_id: payload.order_id,
      },
    });
    // update payment status to success or feailed for order Id
    payment.status = payload.status;
    /* this.client.emit<any>("payment_status_updated", {
      order_id: payload.order_id,
      status: payload.status,
    });
    */
    return await payment.save();
  }

  async confirmPayment(
    user: UserMetaData,
    param: UpdateByIdDto,
    query: UpdateByIdQueryDto
  ) {
    const payment = await this.payRepo.findOne({
      where: {
        id: param.id,
      },
    });

    if (!payment) {
      throw new NotFoundException();
    }
    // update payment status to success or feailed for order Id
    payment.status = query.status;
    return await payment.save();
  }

  async createPayment(user: UserMetaData, payload: CreatePaymentBodyDto) {
    const items = payload.menu_items;
    let totalAmount = 0;
    items.forEach((i) => {
      totalAmount = totalAmount + i.count * i.price;
    });

    const payment = await this.payRepo.save({
      user_id: user.userId,
      restaurant_id: payload.restaurant_id,
      menu_items: payload.menu_items,
      order_id: payload.order_id,
      amount: totalAmount,
      status: "in_progress",
    });
    const status = await this.stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
    });

    return {
      ...status,
      id: payment.id,
    };
  }
}
