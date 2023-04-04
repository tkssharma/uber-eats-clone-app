import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@eats/config";
import { Logger } from "@eats/logger";
import { Like, Repository, Connection, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

import { NotFoundException } from "@nestjs/common";
import { RestaurantEntity } from "../entity/restaurant.entity";
import {
  AddressDto,
  CreateRestaurantBodyDto,
  SearchQueryDto,
} from "../dto/restaurant.dto";
import { RestaurantAddressEntity } from "../entity/restaurant.address.entity";
import { UserMetaData } from "../../auth/guards/user";
import { SearchService } from "../../search/search.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class RestaurantService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    private readonly connection: Connection,
    private configService: ConfigService,
    private readonly searchService: SearchService,
    private eventEmitter: EventEmitter2
  ) {}

  async search(query: SearchQueryDto) {}

  async createRestaurant(user: UserMetaData, payload: CreateRestaurantBodyDto) {
    let createdRestaurant = null;
    console.log(payload);
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      createdRestaurant = await this.createUserRestaurant(
        payload,
        user,
        queryRunner
      );
      await this.createAddress(payload.address, createdRestaurant, queryRunner);
      this.eventEmitter.emit("index.restaurant", createdRestaurant);
      await queryRunner.commitTransaction();
      return createdRestaurant;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  async createUserRestaurant(
    payload,
    user: UserMetaData,
    queryRunner: QueryRunner
  ) {
    return await queryRunner.manager.save(RestaurantEntity, {
      owner_id: user.userId,
      ...payload,
    });
  }
  async createAddress(address: AddressDto, restaurant, queryRunner) {
    return await queryRunner.manager.save(RestaurantAddressEntity, {
      ...address,
      restaurant: restaurant,
    });
  }
}
