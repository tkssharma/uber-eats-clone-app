// Native.
import { Request, Response } from "@nestjs/common";

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
import { Logger } from "@eats/logger";
import { AuthService } from "./auth.service";
import { UserSigInDto } from "./dto/auth-request.dto";
import { UserSignInResponseDto } from "./dto/auth-response.dto";
import { RefreshTokenGuard } from "./guards/refresh_token.guard";
import { AccessTokenGuard } from "./guards/access_token.guard";
import { RoleAllowed } from "./guards/role-decorator";
import { UserRoles } from "@eats/types";

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
  public async CreateUser(
    @Body() body: UserSigInDto,
    @Request() req,
    @Response() res
  ) {
    const response = await this.service.validateUserByPassword(body);
    res.cookie("access_token", response.access_token, {
      httpOnly: true,
      sameSite: "lax",
    });
    res.cookie("refresh_token", response.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
    });
    return res.send(response);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @Get("/logout")
  public async logout(@Request() req, @Response() res) {
    res.cookie("access_token", "", {
      httpOnly: true,
      sameSite: "lax",
    });
    res.cookie("refresh_token", "", {
      httpOnly: true,
      sameSite: "lax",
    });
    //await this.service.logout(req.user)
    return res.send();
  }
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @Post("/refresh")
  public async refreshToken(@Req() req: any) {
    const user = req.user;
    return await this.service.refreshToken(user);
  }
}
