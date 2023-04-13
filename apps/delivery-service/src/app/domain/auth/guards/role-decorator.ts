import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "@eats/types";

export const RoleAllowed = (...role: UserRoles[]) => SetMetadata("roles", role);
