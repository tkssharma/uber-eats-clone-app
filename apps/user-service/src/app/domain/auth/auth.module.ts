import { forwardRef, Module } from "@nestjs/common";
import { AppLoggerModule } from "@eats/logger";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule } from "@eats/config";
import { ConfigService } from "@eats/config";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenJwtStrategy } from "./strategies/access_jwt-strategy";
import { RefreshTokenJwtStrategy } from "./strategies/refresh_jwt-strategy";
import { GoogleController } from "./google.controller";
import { GoogleOauthStrategy } from "./strategies/google_jwt.strategy";
@Module({
  imports: [
    AppLoggerModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    // dynamic initialize of jwt module by passing config
    JwtModule.register({}),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController, GoogleController],
  providers: [
    AuthService,
    RefreshTokenJwtStrategy,
    AccessTokenJwtStrategy,
    GoogleOauthStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
