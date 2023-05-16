// Native.

// Package.
import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request, Post, Body, Response } from "@nestjs/common";
import { Logger } from "@eats/logger";
import { AuthService } from "./auth.service";
import { GoogleOauthGuard } from "./guards/google_auth.guard";

@Controller("auth/google")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("auth-google")
export class GoogleController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    //
  }

  @Get("callback")
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const response = await this.authService.createGoogleToken(req.user);
    res.cookie("access_token", response.access_token, {
      httpOnly: true,
      sameSite: "lax",
    });
    res.cookie("refresh_token", response.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
    });
    return res.redirect(`http://localhost:3000`);
  }
}
