import { forwardRef, Module } from "@nestjs/common";
import { AppLoggerModule } from "src/logger/logger.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule } from "../../../config/config.module";
import { ConfigService } from "../../../config/config.service";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DBModule } from "../../../storage/database/db.module";
import { JwtStrategy } from "./strategies/jwt-strategy";
@Module({
  imports: [
    AppLoggerModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    // dynamic initialize of jwt module by passing config
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          secret: configService.get().auth.secret,
        };
        if (configService.get().auth.expiresIn) {
          options.signOptions = {
            expiresIn: configService.get().auth.expiresIn,
          };
        }
        return options;
      },
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
