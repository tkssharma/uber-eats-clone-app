// Package.
import { Provider } from "@nestjs/common";

// Internal.
import { AWS_S3_TOKEN } from "./aws-s3.constants";
import { AwsS3ClientModuleOptions } from "./aws-s3.interface";
import { getAwsS3ClientModuleOptions } from "./utils";

// Code.
export function createAwsS3ClientProvider(
  options: AwsS3ClientModuleOptions
): Provider {
  return {
    provide: AWS_S3_TOKEN,
    useValue: getAwsS3ClientModuleOptions(options),
  };
}
