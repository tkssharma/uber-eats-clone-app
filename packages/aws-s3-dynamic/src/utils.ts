// Internal.
import { AwsS3ClientModuleOptions } from "./aws-s3.interface";
import { AwsS3ClientService } from "./aws-s3.service";

// Code.
export const getAwsS3ClientModuleOptions = (
  options: AwsS3ClientModuleOptions
): AwsS3ClientService => new AwsS3ClientService(options);
