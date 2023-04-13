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
import { RestaurantService } from "../services/restaurant.service";
import { Type } from "class-transformer";
import {
  CreateRestaurantBodyDto,
  SearchQueryDto,
  UpdateRestaurantBodyDto,
  fetchRestaurantByIdDto,
} from "../dto/restaurant.dto";
import { User, UserMetaData } from "../../auth/guards/user";
import { RolesGuard } from "../../auth/guards/role-guard";
import { UserRoles } from "@eats/types";
import { RoleAllowed } from "../../auth/guards/role-decorator";

@ApiBearerAuth("authorization")
@Controller("restaurants")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("restaurant")
export class RestaurantController {
  constructor(
    private readonly service: RestaurantService,
    private readonly logger: Logger
  ) {}

  @HttpCode(HttpStatus.OK)
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
  @Get("/search")
  public async searchRestaurant(@Query() query: SearchQueryDto) {
    return await this.service.search(query);
  }

  @HttpCode(HttpStatus.OK)
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
  @Get("/:id")
  public async fetchRestaurantById(@Param() param: fetchRestaurantByIdDto) {
    return await this.service.fetchRestaurantById(param);
  }

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
  @RoleAllowed(UserRoles["restaurant-admin"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post("/")
  public async createRestaurant(
    @User() user: UserMetaData,
    @Body() payload: CreateRestaurantBodyDto
  ) {
    return await this.service.createRestaurant(user, payload);
  }

  @HttpCode(HttpStatus.OK)
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
  @RoleAllowed(UserRoles["restaurant-admin"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put("/:id")
  public async updateRestaurant(
    @User() user: UserMetaData,
    @Param() param: fetchRestaurantByIdDto,
    @Body() payload: UpdateRestaurantBodyDto
  ) {
    return await this.service.updateRestaurant(user, payload, param);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: "return all admin restaurants",
  })
  @ApiOkResponse({
    description: "return search restaurants successfully",
  })
  @RoleAllowed(UserRoles["restaurant-admin"])
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get("/")
  public async fetchAllMyRestaurants(@User() user: UserMetaData) {
    return await this.service.fetchAllMyRestaurants(user);
  }
}
