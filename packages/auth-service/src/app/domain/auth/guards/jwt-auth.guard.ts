import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "../../user/entity/user.entity";

@Injectable()
export class AdminGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      const user = <UserEntity>request.user;
      if (user.permissions.includes("root-user")) {
        return true;
      }
    }
    throw new UnauthorizedException(``);
  }
}
