import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DBModule } from "@eats/database";
import { ConfigModule } from "@eats/config";
import { AppLoggerModule } from "@eats/logger";
import { AuthModule } from "../auth/auth.module";
import { UserEntity } from "./entity/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserAddressService } from "./user.address.service";
import { UserAddressController } from "./user.address.controller";
import { UserAddressEntity } from "./entity/user.address.entity";
@Module({
  imports: [
    // most imp
    TypeOrmModule.forFeature([UserEntity, UserAddressEntity]),
    AppLoggerModule,
    ConfigModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController, UserAddressController],
  providers: [UserService, UserAddressService],
  exports: [UserService, UserAddressService],
})
export class UserModule {}
