// Native.
/* eslint-disable no-useless-escape */

// Package.
import {
  Body,
  Controller,
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
import { Type } from "class-transformer";
import {
  CreateRestaurantBodyDto,
  SearchQueryDto,
  UpdateRestaurantBodyDto,
  fetchRestaurantByIdDto,
} from "../dto/cart.dto";
import { User, UserMetaData } from "../../auth/guards/user";
import { RolesGuard } from "../../auth/guards/role-guard";
import { UserRoles } from "@eats/types";
import { RoleAllowed } from "../../auth/guards/role-decorator";
import { OrderService } from "../services/order.service";

@ApiBearerAuth("authorization")
@Controller("order")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("order")
export class OrderController {
  constructor(
    private readonly service: OrderService,
    private readonly logger: Logger
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "search restaurants based on lat/lon",
  })
  @ApiOkResponse({
    description: "return search restaurants successfully",
  })
  // any user cna place an order
  // we just verify token
  @UseGuards(AccessTokenGuard)
  @Post("/")
  public async createRestaurant(
    @User() user: UserMetaData,
    @Body() payload: CreateRestaurantBodyDto
  ) {
    return await this.service.createRestaurant(user, payload);
  }
}
