import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Mapping, Settings } from "./mapping";
import { ConfigService } from "@eats/config";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";

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
  @OnEvent("index.restaurant")
  public async indexRestaurant(restaurant: any): Promise<any> {
    console.log("inside [index.restaurant] handler");
    try {
      const payload = {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        latitude: "11",
        longitude: "11",
        contact_no: "8998978987",
        cuisine: "north indian, south indian",
        banner: "https://gogole.com/banner.png",
        url: "https://gogole.com/banner.png",
        delivery_options: "delivery_options",
        pickup_options: "pickup_options",
        opens_at: "2023-10-05T14:48:00.000Z",
        closes_at: "2023-10-05T14:48:00.000Z",
        address: "hello",
        city: "panjim",
        state: "goa",
        street: "goa",
        pincode: "12001",
        country: "India",
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
  public async search(searchParam: any) {
    try {
      const pagination: any = {
        page: Number(searchParam.page || 1),
        limit: Number(searchParam.limit || 15),
      };
      const skippedItems = (pagination.page - 1) * pagination.limit;
      const { body } = await this.esService.search<any>({
        index: this.configService.get().elastic.index,
        body: {},
        from: skippedItems,
        size: pagination.limit,
      });
      const totalCount = body.hits.total.value;
      const hits = body.hits.hits;
      const profiles = hits.map((item: any) => item._source);
      return {
        totalCount,
        profiles,
      };
    } catch (err) {
      throw err;
    }
  }
}
