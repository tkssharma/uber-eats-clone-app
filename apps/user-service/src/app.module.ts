import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { mainModule } from "process";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainModule } from "./app/domain/domain.module";
import { DevtoolsModule } from "@nestjs/devtools-integration";

@Module({
  imports: [
    DomainModule,
    TerminusModule,
    DevtoolsModule.register({
      http: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
