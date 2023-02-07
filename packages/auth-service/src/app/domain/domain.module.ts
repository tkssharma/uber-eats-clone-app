import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [AuthModule, CoreModule],
  controllers: [],
  providers: [],
})
export class DomainModule {}
