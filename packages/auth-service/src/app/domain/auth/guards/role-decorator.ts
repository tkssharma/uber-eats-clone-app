import { SetMetadata } from "@nestjs/common";
import { Roles } from "./roles";

export const RoleAllowed = (...role: Roles[]) => SetMetadata("roles", role);
