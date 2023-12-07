import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './domain/files/file.module';
import { PrismaModule } from './domain/prisma/prisma.module';
import { AuthModule } from './domain/auth/auth.module';
import { DomainModule } from './domain/domain.module';
import { AWSS3Module } from '@eats/aws-s3';
import { ConfigModule, ConfigService } from '@eats/config';
import { AwsS3ClientModule } from '@eats/aws-s3-dynamic';

@Module({
  imports: [
    DomainModule,
    ConfigModule,
    // dynamic call to import module
    AwsS3ClientModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        region: config.get().aws.region,
        accessKeyId: config.get().aws.accessKeyId,
        secretAccessKey: config.get().aws.secretAccessKey,
        bucket: config.get().aws.bucket,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
