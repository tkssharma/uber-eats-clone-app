import {
  Controller,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
} from "@nestjs/swagger";
import {
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} from "src/app/app.constants";
import { RestaurantDishService } from "../services/restaurant.dish.service";
import { SearchDishQueryDto } from "../dto/restaurant.dish.dto";

@ApiBearerAuth("authorization")
@Controller("dishes")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  })
)
@ApiTags("dish-menu")
export class DishController {
  constructor(private readonly service: RestaurantDishService) {}

  @HttpCode(HttpStatus.OK)
  @ApiConsumes("application/json")
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  // @UseGuards(FirebaseAuthGuard)
  @Get("/")
  public async listRestaurantDish(@Query() query: SearchDishQueryDto) {
    return await this.service.listRestaurantDish(query);
  }
}
