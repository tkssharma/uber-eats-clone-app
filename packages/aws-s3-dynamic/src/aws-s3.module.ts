// Package.
import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";

//Internal
import { AWS_S3_TOKEN, AWS_S3_MODULE_OPTIONS } from "./aws-s3.constants";
import {
  AwsS3ClientModuleOptions,
  AwsS3ClientModuleAsyncOptions,
  AwsS3ClientModuleFactory,
} from "./aws-s3.interface";
import { createAwsS3ClientProvider } from "./aws-s3.provider";
import { getAwsS3ClientModuleOptions } from "./utils";

//Code.
@Global()
@Module({})
export class AwsS3ClientModule {
  public static forRoot(options: AwsS3ClientModuleOptions): DynamicModule {
    const provider: Provider = createAwsS3ClientProvider(options);
    return {
      module: AwsS3ClientModule,
      providers: [provider],
      exports: [provider],
    };
  }

  public static forRootAsync(
    options: AwsS3ClientModuleAsyncOptions
  ): DynamicModule {
    const provider: Provider = {
      inject: [AWS_S3_MODULE_OPTIONS],
      provide: AWS_S3_TOKEN,
      useFactory: async (options: AwsS3ClientModuleOptions) =>
        getAwsS3ClientModuleOptions(options),
    };

    return {
      module: AwsS3ClientModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), provider],
      exports: [provider],
    };
  }

  private static createAsyncProviders(
    options: AwsS3ClientModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<AwsS3ClientModuleFactory>;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: AwsS3ClientModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: AWS_S3_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass ||
        options.useExisting) as Type<AwsS3ClientModuleFactory>,
    ];

    return {
      provide: AWS_S3_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AwsS3ClientModuleFactory) =>
        await optionsFactory.createPlatformModuleOptions(),
      inject,
    };
  }
}
