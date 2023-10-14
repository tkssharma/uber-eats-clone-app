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
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
} from "src/app/app.constants";
import { OrderService } from "../services/order.service";
import { Type } from "class-transformer";
import {
  CreatePaymentBodyDto,
  UpdateByIdDto,
  UpdateByIdQueryDto,
} from "../dto/order.dto";
import { User, UserMetaData } from "../../auth/guards/user";
import { AccessTokenGuard } from "../../auth/guards/access_token.guard";

@ApiBearerAuth("authorization")
@Controller("order")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("orders")
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
  @UseGuards(AccessTokenGuard)
  @Post("/")
  public async createOrder(
    @User() user: UserMetaData,
    @Body() payload: CreatePaymentBodyDto
  ) {
    console.log(user);
    return await this.service.createOrder(user, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseGuards(AccessTokenGuard)
  @Get("/")
  public async getLastProcessedOrder(@User() user: UserMetaData) {
    return await this.service.getLasProcessedOrder(user);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseGuards(AccessTokenGuard)
  @Patch("/:id")
  public async confirmOrder(
    @User() user: UserMetaData,
    @Param() param: UpdateByIdDto,
    @Query() query: UpdateByIdQueryDto
  ) {
    console.log(user);
    return await this.service.confirmOrder(user, param, query);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseGuards(AccessTokenGuard)
  @Get("/test")
  public async testRMQ(@User() user: UserMetaData) {
    return await this.service.testRMQ();
  }
}
