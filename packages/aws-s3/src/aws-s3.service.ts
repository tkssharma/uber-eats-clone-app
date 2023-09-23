// Package.
import { S3 } from "aws-sdk";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@eats/config";

// Internal.

// Code.
@Injectable()
export class AWSS3Service {
  private client: AWS.S3;

  constructor(private configService: ConfigService) {
    console.log(configService);
    // coming undefined
    // lets make this a dynamic module
    this.client = new S3({
      region: "eu-central-1",
    });
  }

  async upload(file: any, key: string, originalname: string) {
    // TODO: ideally the bucket must be parametrized here
    const params: any = {
      Bucket: this.configService.get().aws.bucket,
      Key: key,
      Body: file,
    };
    const uploadResponse = await this.client.upload(params).promise();

    const url = await this.getPresignedUrl(key, originalname);
    return { ...uploadResponse, url };
  }

  async get(bucket: string, key: string) {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    return await this.client.getObject(params).promise();
  }

  async getPresignedUrl(key: string, originalname: string) {
    // TODO: ideally the bucket must be parametrized here
    const params = {
      Bucket: this.configService.get().aws.bucket,
      Key: key,
      Expires: 60 * 60 * 24 * 7,
      ResponseContentDisposition:
        'attachment; filename ="' + originalname + '"',
    };
    return await this.client.getSignedUrlPromise("getObject", params);
  }

  async createPresignedUrl(key: string) {
    const params = {
      Bucket: this.configService.get().aws.bucket,
      Key: key,
      Expires: 60 * 60 * 24 * 7,
    };
    return await this.client.getSignedUrlPromise("putObject", params);
  }
}
