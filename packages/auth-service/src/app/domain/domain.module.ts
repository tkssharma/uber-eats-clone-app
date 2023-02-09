import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule } from "src/config/config.module";
import { AppLoggerModule } from "src/logger/logger.module";
import { DBModule } from "src/storage/database/db.module";
import { AuthModule } from "./auth/auth.module";
import { UserEntity } from "./user/entity/user.entity";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    DBModule.forRoot({
      entities: [UserEntity],
    }),
    UserModule,
    AuthModule,
    TerminusModule,
    AppLoggerModule,
    ConfigModule,
  ],

  controllers: [],
  providers: [],
})
export class DomainModule {}
