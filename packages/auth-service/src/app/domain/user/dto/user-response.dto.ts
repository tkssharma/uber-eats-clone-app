import { ApiResponseProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";

export class UserSignupResponseDto {
  // uuid
  @ApiResponseProperty({
    example: "da9b9f51-23b8-4642-97f7-52537b3cf53b",
    format: "v4",
  })
  public id: string;

  @ApiResponseProperty({
    example: "user@gmail.com",
  })
  public email: string;
}
