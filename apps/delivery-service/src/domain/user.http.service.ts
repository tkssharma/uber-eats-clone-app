import { Injectable } from "@nestjs/common";
import { DeliveryEntity } from "./delivery.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import HttpClientService from "src/lib/http.client.service";
import { ConfigService } from "@eats/config";
import { Request } from "express";

@Injectable()
export class UserProxyService {
  baseURL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClientService: HttpClientService
  ) {
    this.baseURL = this.configService.get().userServiceUrl;
  }
  async fetchAvailavleDeliveryPartners(payload?: any) {
    try {
      const { data } = await this.httpClientService.send({
        url: "available-partners",
        baseURL: this.baseURL,
        method: "GET",
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
  async markDeliveryPartnerAssigned(payload?: any) {
    try {
      const { data } = await this.httpClientService.send({
        url: "available-partners",
        baseURL: this.baseURL,
        method: "PUT",
        data: payload,
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
}
