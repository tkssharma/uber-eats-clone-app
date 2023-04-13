import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@eats/config";
import { Logger } from "@eats/logger";
import { Like, Repository, Connection, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

import { NotFoundException } from "@nestjs/common";
import { CartEntity } from "../entity/cart.entity";
import {
  AddressDto,
  CreateRestaurantBodyDto,
  SearchQueryDto,
  UpdateRestaurantBodyDto,
  fetchRestaurantByIdDto,
} from "../dto/cart.dto";
import { UserMetaData } from "../../auth/guards/user";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class CartService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
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
