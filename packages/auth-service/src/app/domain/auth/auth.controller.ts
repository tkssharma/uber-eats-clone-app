// Native.

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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Logger } from "../../../logger/logger";
import { AuthService } from "./auth.service";
import { UserSigInDto } from "./dto/auth-request.dto";
import { UserSignInResponseDto } from "./dto/auth-response.dto";
import { JwtAuthGuard } from "./guards/admin.guard";

@ApiBearerAuth("authorization")
@Controller("auth")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("auth")
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly logger: Logger
  ) {}

  // define all our user routes
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "user login api returns access token" })
  @ApiOkResponse({
    description: "user  has been login successfully",
    type: UserSignInResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: "internal server error occurred",
  })
  @ApiBadRequestResponse({ description: "bad request" })
  @ApiConsumes("application/json")
  @Post("/login")
  public async CreateUser(@Body() body: UserSigInDto) {
    this.logger.info(JSON.stringify(body));
    return this.service.validateUserByPassword(body);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @Post("/refresh")
  public async refreshToken(@Req() req: any) {
    const user = req.user;
    const newToken = await this.service.createToken(user);
    return newToken;
  }
}
