// Package.
import { ModuleMetadata, Type } from "@nestjs/common";

// Code.
export interface AwsS3ClientModuleOptions {
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  region: string;
}

export interface AwsS3ClientModuleFactory {
  createPlatformModuleOptions: () =>
    | Promise<AwsS3ClientModuleOptions>
    | AwsS3ClientModuleOptions;
}

export interface AwsS3ClientModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<AwsS3ClientModuleFactory>;
  useExisting?: Type<AwsS3ClientModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AwsS3ClientModuleOptions> | AwsS3ClientModuleOptions;
}
