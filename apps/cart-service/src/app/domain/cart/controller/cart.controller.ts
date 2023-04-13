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
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { Logger } from "@eats/logger";
import { AccessTokenGuard } from "../../auth/guards/access_token.guard";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
} from "src/app/app.constants";
import { CartService } from "../services/cart.service";
import { Type } from "class-transformer";
import {
  CreateCartMenuItemBodyDto,
  UpdateCartMenuItemBodyDto,
} from "../dto/cart.dto";
import { User, UserMetaData } from "../../auth/guards/user";
import { RolesGuard } from "../../auth/guards/role-guard";
import { UserRoles } from "@eats/types";
import { RoleAllowed } from "../../auth/guards/role-decorator";

@ApiBearerAuth("authorization")
@Controller("cart")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("cart")
export class CartController {
  constructor(
    private readonly service: CartService,
    private readonly logger: Logger
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseGuards(AccessTokenGuard)
  @Post("/")
  public async addMenuItemToCart(
    @User() user: UserMetaData,
    @Body() payload: CreateCartMenuItemBodyDto
  ) {
    return await this.service.createCartMenuItem(user, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseGuards(AccessTokenGuard)
  @Get("/")
  public async listUserCart(@User() user: UserMetaData) {
    return await this.service.listUserCart(user);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseGuards(AccessTokenGuard)
  @Put("/")
  public async updateUserCart(
    @User() user: UserMetaData,
    @Body() payload: UpdateCartMenuItemBodyDto
  ) {
    return await this.service.updateCartMenuItem(user, payload);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseGuards(AccessTokenGuard)
  @Delete("/")
  public async deleteUserMenuItemCart(
    @User() user: UserMetaData,
    @Body() payload: UpdateCartMenuItemBodyDto
  ) {
    return await this.service.deleteCartMenuItem(user, payload);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseGuards(AccessTokenGuard)
  @Delete("/clear")
  public async clearUserCart(@User() user: UserMetaData) {
    return await this.service.clearCartMenuItem(user);
  }
}
