import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Logger } from "@eats/logger";
import { Repository, Connection } from "typeorm";

import { OrderEntity } from "../entity/order.entity";
import { CreateRestaurantBodyDto } from "../dto/cart.dto";
import { UserMetaData } from "../../auth/guards/user";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class OrderService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(OrderEntity)
    private cartRepo: Repository<OrderEntity>,
    private readonly connection: Connection,
    private eventEmitter: EventEmitter2
  ) {}
  async createRestaurant(user: UserMetaData, payload: CreateRestaurantBodyDto) {
    let createdRestaurant = null;
    console.log(payload);
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      //const address = await this.createAddress(payload.address, createdRestaurant, queryRunner);
      this.eventEmitter.emit("index.restaurant", {
        restaurant: createdRestaurant,
      });
      await queryRunner.commitTransaction();
      return createdRestaurant;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
