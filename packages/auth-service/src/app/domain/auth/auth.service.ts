import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import { UserService } from "../user/user.service";
import { UserSigInDto } from "./dto/auth-request.dto";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../user/entity/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async validateUserByPassword(payload: UserSigInDto) {
    const { email, password } = payload;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      // we will throw some custom exception later
      throw new NotFoundException();
    }
    let isMatch = false;

    isMatch = await this.comparePassword(password, user.password);

    if (isMatch) {
      return await this.createToken(user);
    } else {
      throw new NotFoundException(`user with email password not found`);
    }
  }
  public async validateJwtPayload(payload: JwtPayload) {
    return await this.usersService.findOneByEmail(payload.email);
  }
  public async createToken(user: UserEntity) {
    let expiration: Date | undefined;
    const expiresIn = this.configService.get().auth.expiresIn;
    // it should be in seconds
    if (expiresIn) {
      expiration = new Date();
      expiration.setDate(expiration.getTime() + expiresIn * 1000);
    }
    const data: JwtPayload = {
      userId: user.id,
      email: user.email,
      permissions: user.permissions,
      expiration,
    };

    const jwt = this.jwtService.sign(data);
    return {
      ...data,
      access_token: jwt,
    };
  }
  private async comparePassword(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
