import { forwardRef, Module } from "@nestjs/common";
import { AppLoggerModule } from "@eats/logger";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule } from "@eats/config";
import { AccessTokenJwtStrategy } from "./strategies/access_jwt-strategy";
import { RolesGuard } from "./guards/role-guard";
@Module({
  imports: [
    AppLoggerModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [AccessTokenJwtStrategy, RolesGuard],
  exports: [],
})
export class AuthModule {}

/*
HTTP REST APIs

/api/v1/restaurants 
    - /search (query param) [ES]
    -/ POST (create a new restaurant) (pagination) (address)
    -/:id (get restaurant)
    -/:id HTTP PUT 
    -/:id HTTP DELETE
    - /:id/fav 
        - GET
        - patch

/api/v1/restaurants/:id/dishes
    - / GET fetch all menu items (pagination)
    - / POST create new dish
    - /:id DELETE 
    - /:id PUT
    - /:id/fav 
        - GET
        - patch

/api/v1/restaurants/:id/dishes
    - / GET fetch all menu items (pagination)
    - / POST create new dish
    - /:id DELETE 
    - /:id PUT











*/
