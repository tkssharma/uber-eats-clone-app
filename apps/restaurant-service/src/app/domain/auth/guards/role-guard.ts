import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRoles } from "@eats/types";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles =
      this.reflector.getAllAndMerge<UserRoles[]>("roles", [
        context.getClass(),
        context.getHandler(),
      ]) || [];

    if (roles && roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && !user.permissions) {
      return false;
    }
    const hasRole = () =>
      user.permissions
        ?.split(",")
        .some((role: string) => roles.find((i) => i === role));

    return user && user.permissions && hasRole();
  }
}
