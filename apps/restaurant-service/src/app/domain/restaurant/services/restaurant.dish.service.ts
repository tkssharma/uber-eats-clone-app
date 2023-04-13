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
import { RestaurantEntity } from "../entity/restaurant.entity";
import {
  AddressDto,
  CreateRestaurantBodyDto,
  SearchQueryDto,
} from "../dto/restaurant.dto";
import { RestaurantAddressEntity } from "../entity/restaurant.address.entity";
import { UserMetaData } from "../../auth/guards/user";
import { RestaurantDishEntity } from "../entity/restaurant.dish.entity";
import {
  CreateRestaurantDishBodyDto,
  RestaurantParamParamDto,
  UpdateDishItemParamDto,
  UpdateRestaurantDishBodyDto,
} from "../dto/restaurant.dish.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class RestaurantDishService {
  constructor(
    private readonly logger: Logger,
    private eventEmitter: EventEmitter2,
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(RestaurantDishEntity)
    private restaurantDishRepo: Repository<RestaurantDishEntity>,
    private readonly connection: Connection,
    private configService: ConfigService
  ) {}

  async validateAuthorization(
    user: UserMetaData,
    param: RestaurantParamParamDto
  ) {
    const { id } = param;
    const restaurant = await this.restaurantRepo.findOne({
      where: { id },
    });
    if (!restaurant) {
      throw new NotFoundException(`restaurant with this Id not found ${id}`);
    }
    if (user.userId !== restaurant.owner_id) {
      throw new ForbiddenException();
    }
    return restaurant;
  }
  async findDishById(id: string) {
    const dish = await this.restaurantDishRepo.findOne({
      where: { id },
    });
    if (!dish) {
      throw new NotFoundException(
        `restaurant dish with this Id not found ${id}`
      );
    }
    return dish;
  }

  async createDish(
    user: UserMetaData,
    param: RestaurantParamParamDto,
    payload: CreateRestaurantDishBodyDto
  ) {
    const restaurant = await this.validateAuthorization(user, param);
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const dish = await this.createUserRestaurantDish(
        payload,
        user,
        restaurant,
        queryRunner
      );
      const menus = await this.restaurantDishRepo.find({
        where: { restaurant: { id: restaurant.id } },
      });
      if (menus && menus.length > 0) {
        const menuItems = menus.map((i) => i.name).join(",");
        this.eventEmitter.emit("index.dish.restaurant", {
          restaurant,
          menuItems,
        });
      }
      await queryRunner.commitTransaction();
      return dish;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  async updateDish(
    user: UserMetaData,
    param: UpdateDishItemParamDto,
    payload: UpdateRestaurantDishBodyDto
  ) {
    const { dish_id, id } = param;

    await this.validateAuthorization(user, param);
    const dish = await this.findDishById(dish_id);
    return await this.restaurantDishRepo.save({
      id: dish.id,
      ...payload,
    });
  }
  async deleteDish(user: UserMetaData, param: UpdateDishItemParamDto) {
    const { dish_id, id } = param;

    await this.validateAuthorization(user, param);
    const dish = await this.findDishById(dish_id);
    await this.restaurantDishRepo.delete({
      id: dish.id,
    });
  }
  async createUserRestaurantDish(
    payload,
    user: UserMetaData,
    restaurant: RestaurantEntity,
    queryRunner: QueryRunner
  ) {
    return await queryRunner.manager.save(RestaurantDishEntity, {
      restaurant: restaurant,
      ...payload,
    });
  }

  async getAllDishByRestaurant(
    user: UserMetaData,
    param: RestaurantParamParamDto
  ) {
    const { id } = param;
    const restaurant = await this.restaurantRepo.findOne({
      where: { id },
    });
    if (!restaurant) {
      throw new NotFoundException(`restaurant with this Id not found ${id}`);
    }
    const dishes = await this.restaurantDishRepo.find({
      where: {
        restaurant: {
          id,
        },
      },
    });
    return {
      restaurant,
      dishes,
    };
  }
}
