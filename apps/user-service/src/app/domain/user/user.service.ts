import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@eats/config";
import { Logger } from "@eats/logger";
import { Like, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import {
  fieldsToUpdateDto,
  FindUserDto,
  UpdateUserByIdDto,
  UpdateUserPermissionBodyDto,
  UserSignupDto,
} from "./dto/user-request.dto";
import { UserEntity } from "./entity/user.entity";
import { AuthService } from "../auth/auth.service";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private configService: ConfigService
  ) {}

  async getAllUsers() {
    return this.userRepo.find({});
  }

  async update(
    email: string,
    fields: fieldsToUpdateDto
  ): Promise<UserEntity | undefined> {
    // check what all use is asking to update
    if (fields.email) {
      const duplicateUser = await this.findOneByEmail(fields.email);
      if (duplicateUser) {
        // reset value as we don't allow duplicate
        fields.email = undefined;
      }
    }
    const fieldToUpdate: any = {};
    if (fields.password_update && fields.password_update.new_password) {
      // check if old password passed here is correct with email
      // we can check that with auth service
      // user wants to update password
      // const shouldWeAllow =
      // check with auth service if we can update password
      // validate if user exists with this email and password
      const shouldAllowUpdate = this.authService.validateUserByPassword({
        email,
        password: fields.password_update.old_password,
      });
      if (shouldAllowUpdate) {
        fieldToUpdate.password = fieldToUpdate.password_update.new_password;
      }
    }
    for (const key in fieldsToUpdateDto) {
      if (typeof fieldToUpdate[key] !== undefined && key !== undefined) {
        fieldToUpdate[key] = fieldsToUpdateDto[key];
      }
    }
    let user: UserEntity | undefined | null;
    // now we have final payload to push for update
    if (Object.entries(fieldToUpdate).length > 0) {
      user = await this.findOneByEmail(email.toLowerCase());
      const saveEntity = { ...user, ...fieldToUpdate };
      await this.userRepo.save(saveEntity);
    }
    // return updated user
    user = await this.findOneByEmail(email);
    return user;
  }

  async findOneByUserId(id: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  hashData(token: string) {
    return bcrypt.hash(token, 10);
  }
  async updateRefreshTokenByEmail(email: string, refToken: string) {
    if (!refToken) {
      const user = await this.findOneByEmail(email.toLowerCase());
      const saveEntity = { ...user, refresh_token: null };
      return await this.userRepo.save(saveEntity);
    }
    const hashedToken = await this.hashData(refToken);
    const user = await this.findOneByEmail(email.toLowerCase());
    const saveEntity = { ...user, refresh_token: hashedToken };
    return await this.userRepo.save(saveEntity);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  async findUserByProperty(data: FindUserDto) {
    const { email, first_name, last_name, name } = data;
    const users = await this.userRepo.find({
      where: [
        { name: Like(`%${name}%`) },
        { email: Like(`%${email}%`) },
        { first_name: Like(`%${first_name}%`) },
        { last_name: Like(`%${last_name}%`) },
      ],
    });
    return users;
  }

  async assignUserPermissions(
    param: UpdateUserByIdDto,
    payload: UpdateUserPermissionBodyDto
  ) {
    const { id } = param;
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    user.permissions = payload.permissions;
    return await user.save();
  }

  async create(userInput: UserSignupDto): Promise<UserEntity> {
    const userEntity = this.userRepo.create();
    const { email } = userInput;
    const existingUser = await this.findOneByEmail(email.toLowerCase());
    if (existingUser) {
      throw new ConflictException("user with email already exists");
    }
    const pass = await this.hashPassword(userInput.password);

    const saveEntity = {
      ...userEntity,
      ...userInput,
      password: pass,
      first_name: userInput?.first_name?.toLowerCase(),
      last_name: userInput?.last_name?.toLowerCase(),
      email: userInput?.email.toLowerCase(),
    };

    let user: UserEntity | null;
    try {
      user = await this.userRepo.save(saveEntity);
      this.logger.log(`user created successfully ${JSON.stringify(user)}`);
      return user;
    } catch (err) {
      this.logger.error(err);
      throw new ConflictException(`user already exist with same email`);
    }
  }
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
