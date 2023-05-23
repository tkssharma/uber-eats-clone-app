import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@eats/config";
import { AuthService } from "../auth.service";

// Bearer <>//

@Injectable()
export class AccessTokenJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          console.log(request.cookies);
          let data = request?.cookies["access_token"];
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
      secretOrKey: configService.get().auth.access_token_secret,
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateJwtPayload(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
