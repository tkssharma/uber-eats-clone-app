import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { ConfigModule } from "@eats/config";
import { AppLoggerModule } from "@eats/logger";
import { DBModule } from "@eats/database";

@Module({
  imports: [
    DBModule.forRoot({
      entities: [],
    }),
    TerminusModule,
    AppLoggerModule,
    ConfigModule,
  ],

  controllers: [],
  providers: [],
})
export class DomainModule {}
