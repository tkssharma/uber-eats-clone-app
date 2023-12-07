// Package.
import { Inject } from "@nestjs/common";
import { S3 } from "aws-sdk";

// Internal.
import { AWS_S3_MODULE_OPTIONS } from "./aws-s3.constants";
import { AwsS3ClientModuleOptions } from "./aws-s3.interface";

export class AwsS3ClientService {
  private client: AWS.S3;

  constructor(
    @Inject(AWS_S3_MODULE_OPTIONS)
    private readonly options: AwsS3ClientModuleOptions
  ) {
    this.client = new S3({
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
      region: options.region,
    });
  }

  async upload(file: any, key: string, originalname: string) {
    // TODO: ideally the bucket must be parametrized here
    const params: any = {
      Bucket: this.options.bucket,
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
      Bucket: this.options.bucket,
      Key: key,
      Expires: 60 * 60 * 24 * 7,
      ResponseContentDisposition:
        'attachment; filename ="' + originalname + '"',
    };
    return await this.client.getSignedUrlPromise("getObject", params);
  }

  async createPresignedUrl(key: string) {
    const params = {
      Bucket: this.options.bucket,
      Key: key,
      Expires: 60 * 60 * 24 * 7,
    };
    return await this.client.getSignedUrlPromise("putObject", params);
  }
}
