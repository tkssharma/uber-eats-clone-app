import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform, Type as ValidateType } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type as validateType } from "class-transformer";
import { mealType, cuisineType, foodType } from "@eats/types";

export class MenuItemBodyDto {
  @ApiProperty({
    description: "id",
    example: "5272ec36-d9db-11ed-afa1-0242ac120002",
    required: true,
  })
  @IsDefined()
  @IsString()
  public id!: string;

  @ApiProperty({
    description: "name",
    example: "paneer tikka masala",
    required: true,
  })
  @IsDefined()
  @IsString()
  public name!: string;

  @ApiProperty({
    description: "descriotion",
    example:
      "Paneer tikka or Paneer Soola or Chhena Soola is an Indian dish made from chunks of paneer/ chhena marinated in spices and grilled in a tandoor. It is a vegetarian alternative to chicken tikka and other meat dishes. It is a popular dish that is widely available in India and countries with an Indian diaspora",
    required: true,
  })
  @IsOptional()
  @IsString()
  public description!: string;

  @ApiProperty({
    description: "cuisine_type",
    required: true,
    enum: cuisineType,
    example: cuisineType.indian,
  })
  @IsEnum(cuisineType)
  public cuisine_type!: string;

  @ApiProperty({
    description: "meal_type",
    required: true,
    enum: mealType,
    example: mealType.breakfast,
  })
  @IsEnum(mealType)
  public meal_type!: string;

  @ApiProperty({
    description: "category",
    example: "category",
    required: true,
  })
  @IsOptional()
  @IsString()
  public category!: string;

  @ApiProperty({
    description: "ingredients",
    example: "ingredients",
    required: true,
  })
  @IsOptional()
  @IsString()
  public ingredients!: string;

  @ApiProperty({
    description: "food_type",
    required: true,
    enum: foodType,
    example: foodType.vegan,
  })
  @IsEnum(foodType)
  public food_type!: string;

  @ApiProperty({
    description: "price",
    example: 500,
    required: true,
  })
  @IsNumber()
  public price!: number;

  @ApiProperty({
    description: "number of items",
    example: 2,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  public count!: number;

  @ApiProperty({
    description: "thumbnails",
    example: "https://google.com/banner.png",
    required: true,
  })
  @IsOptional()
  @IsString()
  public thumbnails!: string;
}

export class CreatePaymentBodyDto {
  @ApiProperty({
    description: "restaurant_id",
    example: "5272ec36-d9db-11ed-afa1-0242ac120002",
    required: true,
  })
  @IsUUID()
  @IsString()
  public restaurant_id!: string;

  @ApiProperty({
    description: "order_id",
    example: "5272ec36-d9db-11ed-afa1-0242ac120002",
    required: true,
  })
  @IsUUID()
  @IsString()
  public order_id!: string;

  @ApiProperty({
    description: "menu_item object",
    example: [
      {
        id: "5272ec36-d9db-11ed-afa1-0242ac120009",
        name: "paneer tikka masala",
        description:
          "Paneer tikka or Paneer Soola or Chhena Soola is an Indian dish made from chunks of paneer/ chhena marinated in spices and grilled in a tandoor. It is a vegetarian alternative to chicken tikka and other meat dishes. It is a popular dish that is widely available in India and countries with an Indian diaspora",
        cuisine_type: "indian",
        meal_type: "breakfast",
        category: "category",
        ingredients: "ingredients",
        food_type: "vegan",
        count: 1,
        price: 500,
        thumbnails: "https://google.com/banner.png",
      },
    ],
    required: true,
  })
  @IsArray()
  @ValidateNested()
  @ValidateType(() => MenuItemBodyDto)
  public menu_items!: MenuItemBodyDto[];
}

export class UpdatePaymentBodyDto extends PartialType(CreatePaymentBodyDto) {
  @ApiProperty({
    description: "status",
    example: "success/failure",
    required: true,
  })
  @IsString()
  public status!: string;
}
