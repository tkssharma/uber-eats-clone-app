import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DBModule } from "@eats/database";
import { ConfigModule } from "@eats/config";
import { AppLoggerModule } from "@eats/logger";
import { AuthModule } from "../auth/auth.module";
import { UserEntity } from "./entity/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
@Module({
  imports: [
    // most imp
    TypeOrmModule.forFeature([UserEntity]),
    AppLoggerModule,
    ConfigModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
