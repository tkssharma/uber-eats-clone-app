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
  UpdateRestaurantBodyDto,
  fetchRestaurantByIdDto,
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

  public async search(searchParam: SearchQueryDto) {
    return await this.searchService.search(searchParam);
  }

  public async fetchAllMyRestaurants(user: UserMetaData) {
    const { userId } = user;
    return await this.restaurantRepo.find({
      where: { owner_id: userId },
      relations: ["dishes"],
    });
  }

  public async fetchRestaurantById(param: fetchRestaurantByIdDto) {
    const { id } = param;
    return await this.restaurantRepo.find({
      where: { id },
      relations: ["dishes"],
    });
  }

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
      const address = await this.createAddress(
        payload.address,
        createdRestaurant,
        queryRunner
      );
      this.eventEmitter.emit("index.restaurant", {
        restaurant: createdRestaurant,
        address,
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

  async validateAuthorization(
    user: UserMetaData,
    param: fetchRestaurantByIdDto
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

  async updateRestaurant(
    user: UserMetaData,
    payload: UpdateRestaurantBodyDto,
    param: fetchRestaurantByIdDto
  ) {
    const restaurant = await this.validateAuthorization(user, param);
    try {
      await this.restaurantRepo.save({ ...restaurant, payload });
    } catch (err) {
      throw err;
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
  async createAddress(
    address: AddressDto,
    restaurant,
    queryRunner
  ): Promise<RestaurantAddressEntity> {
    return await queryRunner.manager.save(RestaurantAddressEntity, {
      ...address,
      restaurant: restaurant,
    });
  }
}
