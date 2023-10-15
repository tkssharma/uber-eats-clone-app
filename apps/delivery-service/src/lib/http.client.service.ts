import { Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import debug from "debug";
import { ConfigService } from "@eats/config";
import { Request } from "express";

const verbose = debug("rfx:verbose:handler");

interface RequestOptions {
  url: string;
  baseURL: string;
  data?: object;
  params?: object;
  formData?: any;
  method: string;
}
@Injectable()
export default class HttpClientService {
  public baseUrl: string;
  public token: string;
  constructor(private readonly configService: ConfigService) {}
  public async send(
    options: RequestOptions,
    overrideHeaders?: any
  ): Promise<any> {
    const start = new Date();
    try {
      const headers = {
        "Content-Type": "application/json",
        ...overrideHeaders,
      };
      const httpRequest: AxiosRequestConfig = {
        ...options,
        headers,
      };
      verbose(httpRequest);
      const data = await axios(httpRequest);
      return data;
    } catch (error) {
      console.log(
        `HttpClientService -> send [external http]' ${JSON.stringify({
          options,
        })}`
      );
      throw error;
    } finally {
      const end = new Date();
      console.log(
        `type=OutgoingRequest endpoint=${options.baseURL} duration=${
          end.getTime() - start.getTime()
        }  `
      );
    }
  }
}
