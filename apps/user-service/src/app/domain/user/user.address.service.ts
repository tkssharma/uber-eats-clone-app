import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@eats/config";
import { Logger } from "@eats/logger";
import { Like, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import {
  CreateAddressDto,
  fieldsToUpdateDto,
  FindUserDto,
  UpdateUserByIdDto,
  UpdateUserPermissionBodyDto,
  UserSignupDto,
} from "./dto/user-request.dto";
import { UserEntity } from "./entity/user.entity";
import { AuthService } from "../auth/auth.service";
import { NotFoundException } from "@nestjs/common";
import { UserAddressEntity } from "./entity/user.address.entity";
import { UserMetaData } from "../auth/guards/user";

@Injectable()
export class UserAddressService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(UserAddressEntity)
    private userAddressRepo: Repository<UserAddressEntity>
  ) {}

  async create(
    body: CreateAddressDto,
    apiUser: UserMetaData
  ): Promise<UserAddressEntity> {
    const user = await this.userRepo.findOne({ where: { id: apiUser.userId } });

    if (!user) {
      throw new NotFoundException(`user not found`);
    }

    const saveEntity = {
      ...body,
      user,
    };
    const createdAddress = await this.userAddressRepo.save(saveEntity);
    this.logger.log(
      `address created successfully ${JSON.stringify(createdAddress)}`
    );
    return createdAddress;
  }

  async fetchAllAddress(apiUser: UserMetaData) {
    return await this.userAddressRepo.find({
      where: {
        user: { id: apiUser.userId },
      },
    });
  }
}
