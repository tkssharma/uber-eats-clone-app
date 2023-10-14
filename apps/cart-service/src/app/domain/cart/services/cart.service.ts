import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@eats/config";
import { Logger } from "@eats/logger";
import { Like, Repository, Connection, QueryRunner } from "typeorm";

import { NotFoundException } from "@nestjs/common";
import { CartEntity } from "../entity/cart.entity";
import {
  CreateCartMenuItemBodyDto,
  MenuItemBodyDto,
  UpdateCartMenuItemBodyDto,
} from "../dto/cart.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserMetaData } from "../../auth/guards/user";

@Injectable()
export class CartService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
    private eventEmitter: EventEmitter2
  ) {}

  async createCartMenuItem(
    user: UserMetaData,
    payload: CreateCartMenuItemBodyDto
  ) {
    const { restaurant_id } = payload;

    const existingCart = await this.cartRepo.findOne({
      where: {
        restaurant_id,
        user_id: user.userId,
      },
    });
    let existingItems: MenuItemBodyDto[] = [];
    if (existingCart) {
      existingItems = existingCart.menu_items;
      const isItemExists = existingItems.find(
        (i) => i.id === payload.menu_item.id
      );
      if (!isItemExists) {
        payload.menu_item.count = 1;
        existingItems.push(payload.menu_item);
      } else {
        existingItems = existingItems.map((i) => {
          if (i.id === payload.menu_item.id) {
            i.count = i.count + 1;
            return i;
          }
          return i;
        });
      }
      existingCart.menu_items = existingItems;
      return await existingCart.save();
    } else {
      payload.menu_item.count = 1;
      existingItems.push(payload.menu_item);
      return await this.cartRepo.save({
        user_id: user.userId,
        restaurant_id: restaurant_id,
        menu_items: existingItems,
        restaurant: payload.restaurant,
      });
    }
  }

  async deleteCartMenuItem(
    user: UserMetaData,
    payload: UpdateCartMenuItemBodyDto
  ) {
    const { userId } = user;
    const { restaurant_id, menu_item } = payload;
    const existingCart = await this.cartRepo.findOne({
      where: {
        restaurant_id,
        user_id: userId,
      },
    });
    if (!existingCart) {
      throw new NotFoundException();
    } else {
      const updatedMenuItems = existingCart.menu_items
        .map((i) => {
          if (i.id === menu_item.id) {
            i.count = i.count - 1;
            return i;
          }
          return i;
        })
        .filter((i) => i.count > 0);
      existingCart.menu_items = updatedMenuItems;
      return await existingCart.save();
    }
  }
  async clearCartMenuItem(user: UserMetaData) {
    const { userId } = user;
    const item = await this.cartRepo.findOne({
      where: {
        user_id: userId,
      },
    });
    await this.cartRepo.delete({ id: item.id });
    return null;
  }

  async listUserCart(user: UserMetaData) {
    const { userId } = user;
    return await this.cartRepo.findOne({
      where: {
        user_id: userId,
      },
    });
  }
}
