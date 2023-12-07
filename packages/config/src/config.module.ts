import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ConfigService_ } from "./config.service_";

const configFactory = {
  provide: ConfigService,
  useFactory: () => {
    const config = new ConfigService();
    config.loadFromEnv();
    return config;
  },
};

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [configFactory, ConfigService_],
  exports: [configFactory, ConfigService_],
})
export class ConfigModule {}
