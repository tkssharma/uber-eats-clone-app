// Package.
import { Global, Module } from "@nestjs/common";

// Internal.
import { AWSS3Service } from "./aws-s3.service";
import { ConfigModule } from "@eats/config";

// Code.
@Global()
@Module({
  imports: [ConfigModule],
  providers: [AWSS3Service],
  exports: [AWSS3Service],
})
export class AWSS3Module {}
