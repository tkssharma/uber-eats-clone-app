import { Module } from '@nestjs/common';
import { FileModule } from '../domain/files/file.module';
import { AppLoggerModule } from '@eats/logger';
import { AuthModule } from '../domain/auth/auth.module';
import { ConfigModule } from '@eats/config';

@Module({
  imports: [FileModule, AuthModule, AppLoggerModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class DomainModule {}
