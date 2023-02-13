import { forwardRef, Module } from "@nestjs/common";
import { AppLoggerModule } from "src/logger/logger.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule } from "../../../config/config.module";
import { ConfigService } from "../../../config/config.service";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenJwtStrategy } from "./strategies/access_jwt-strategy";
import { RefreshTokenJwtStrategy } from "./strategies/refresh_jwt-strategy";
@Module({
  imports: [
    AppLoggerModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    // dynamic initialize of jwt module by passing config
    JwtModule.register({}),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenJwtStrategy, AccessTokenJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
