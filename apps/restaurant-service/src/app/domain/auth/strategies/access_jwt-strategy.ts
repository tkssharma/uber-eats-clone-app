import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@eats/config";
import { debug } from "debug";

const verbose = debug("eats-restaurant:verbose:handler");
const error = debug("eats-restaurant:verbose:handler");

// Bearer <>//

@Injectable()
export class AccessTokenJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get().auth.access_token_secret,
    });
  }
  async validate(payload: JwtPayload) {
    verbose(payload);
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
