import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Mapping, Settings } from "./mapping";
import { ConfigService } from "@eats/config";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { RestaurantService } from "../restaurant/services/restaurant.service";
import { SearchQueryDto } from "../restaurant/dto/restaurant.dto";
import { RestaurantEntity } from "../restaurant/entity/restaurant.entity";
import { RestaurantAddressEntity } from "../restaurant/entity/restaurant.address.entity";

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private eventEmitter: EventEmitter2,
    private readonly configService: ConfigService
  ) {}
  public async createIndex() {
    // create index if doesn't exist
    try {
      const index = this.configService.get().elastic.index;
      const checkIndex = await this.esService.indices.exists({ index });
      console.log(checkIndex);
      if (checkIndex.statusCode === 404) {
        this.esService.indices.create(
          {
            index,
            body: {
              mappings: Mapping,
              settings: Settings,
            },
          },
          (err: any) => {}
        );
      }
    } catch (err) {
      throw err;
    }
  }

  @OnEvent("index.dish.restaurant")
  public async indexRestaurantWithDish(data: {
    restaurant: RestaurantEntity;
    menuItems: string;
  }): Promise<any> {
    const { restaurant, menuItems } = data;
    console.log("inside [index.restaurant] handler");
    try {
      const payload = {
        menu: menuItems,
        ...restaurant,
      };
      return await this.esService.update({
        index: this.configService.get().elastic.index,
        id: restaurant.id,
        body: {
          doc: payload,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  @OnEvent("index.restaurant")
  public async indexRestaurant(data: {
    restaurant: RestaurantEntity;
    address: RestaurantAddressEntity;
  }): Promise<any> {
    const { restaurant, address } = data;
    console.log("inside [index.restaurant] handler");
    try {
      const payload = {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        contact_no: restaurant.contact_no,
        cuisine: restaurant.cuisine,
        banner: restaurant.banner,
        url: restaurant.website_url,
        delivery_options: restaurant.delivery_options,
        pickup_options: restaurant.pickup_options,
        opens_at: restaurant.opens_at,
        closes_at: restaurant.closes_at,
        menu: "",
        address: address.street,
        city: address.city,
        state: address.state,
        street: address.street,
        pincode: address.pincode,
        country: address.country,
      };
      return await this.esService.index({
        index: this.configService.get().elastic.index,
        id: payload.id,
        body: payload,
      });
    } catch (err) {
      throw err;
    }
  }
  public async search(searchParam: SearchQueryDto) {
    try {
      const pagination: any = {
        page: Number(searchParam.page || 1),
        limit: Number(searchParam.limit || 15),
      };
      const skippedItems = (pagination.page - 1) * pagination.limit;
      const { body } = await this.esService.search<any>({
        index: this.configService.get().elastic.index,
        body: this.buildSearchQuery(searchParam),
        from: skippedItems,
        size: pagination.limit,
      });
      const totalCount = body.hits.total.value;
      const hits = body.hits.hits;
      const restaurants = hits.map((item: any) => item._source);
      return {
        totalCount,
        restaurants,
      };
    } catch (err) {
      throw err;
    }
  }

  public buildSearchQuery(searchParam: SearchQueryDto) {
    const { search_text } = searchParam;
    try {
      const query = [];
      if (search_text) {
        query.push({
          multi_match: {
            query: `${search_text}`,
            type: "cross_fields",
            fields: [
              "name",
              "name.word_delimiter",
              "description",
              "description.word_delimiter",
              "menu",
              "menu.word_delimiter",
              "city",
              "address",
            ],
            operator: "or",
          },
        });
      }
      return {
        query: {
          bool: {
            must: query,
          },
        },
      };
    } catch (err) {
      throw err;
    }
  }
}
