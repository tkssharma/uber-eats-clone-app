import { Inject } from "@nestjs/common";
import { AWS_S3_TOKEN } from "./aws-s3.constants";

export function InjectAwsS3Client() {
  return Inject(AWS_S3_TOKEN);
}
