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
import { PaymentService } from "../services/payment.service";
import { Type } from "class-transformer";
import {
  CreatePaymentBodyDto,
  UpdateByIdDto,
  UpdateByIdQueryDto,
  UpdatePaymentBodyDto,
} from "../dto/payment.dto";
import { User, UserMetaData } from "../../auth/guards/user";
import { AccessTokenGuard } from "../../auth/guards/access_token.guard";

@ApiBearerAuth("authorization")
@Controller("payments")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("payment")
export class PaymentController {
  constructor(
    private readonly service: PaymentService,
    private readonly logger: Logger
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @Post("/")
  @UseGuards(AccessTokenGuard)
  public async addPayments(
    @User() user: UserMetaData,
    @Body() payload: CreatePaymentBodyDto
  ) {
    return await this.service.createPayment(user, payload);
  }
  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @Put("/")
  @UseGuards(AccessTokenGuard)
  public async updatePayments(
    @User() user: UserMetaData,
    @Body() payload: UpdatePaymentBodyDto
  ) {
    return await this.service.updatePayment(user, payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @Patch("/:id")
  @UseGuards(AccessTokenGuard)
  public async confirmPayment(
    @User() user: UserMetaData,
    @Param() param: UpdateByIdDto,
    @Query() query: UpdateByIdQueryDto
  ) {
    return await this.service.confirmPayment(user, param, query);
  }
}
