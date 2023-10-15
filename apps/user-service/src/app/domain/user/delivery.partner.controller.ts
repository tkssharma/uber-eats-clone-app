// Native.
/* eslint-disable no-useless-escape */

// Package.
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { Logger } from "@eats/logger";
import { AccessTokenGuard } from "../auth/guards/access_token.guard";
import { RoleAllowed } from "../auth/guards/role-decorator";
import { RolesGuard } from "../auth/guards/role-guard";
import {
  FindUserDto,
  GetPartnerAvailabulity,
  GetPartnerbyId,
  UpdateUserByIdDto,
  UpdateUserPermissionBodyDto,
  UserSignupDto,
  fieldsToUpdateDto,
} from "./dto/user-request.dto";
import { UserSignupResponseDto } from "./dto/user-response.dto";
import { UserService } from "./user.service";
import { User } from "../auth/guards/user";
import { UserEntity } from "./entity/user.entity";
import {
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from "src/app/app.constants";
import { UserRoles } from "@eats/types";

@Controller("partners")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("partners")
export class DeliveryPartnerController {
  constructor(
    private readonly service: UserService,
    private readonly logger: Logger
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserSignupResponseDto, description: "" })
  @ApiOperation({ description: "return available delivery partner" })
  @ApiConsumes("application/json")
  @Get("")
  public async fetchAvailablePartner() {
    return this.service.fetchAvailablePartner();
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: UserSignupResponseDto,
    description: "partner profile updated successfully",
  })
  @ApiOkResponse({ type: UserSignupResponseDto, description: "" })
  @ApiOperation({ description: "partner update api " })
  @ApiConsumes("application/json")
  @Put("/:id")
  public async updatePartnerAvailabulity(
    @Param() param: GetPartnerbyId,
    @Body() body: GetPartnerAvailabulity
  ) {
    return this.service.updatePartnerAvailabulity(param, body);
  }
}
