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
import { UserRoles } from "@eats/types";

export enum mealType {
  "breakfast" = "breakfast",
  "lunch" = "lunch",
  "dinner" = "dinner",
}
export enum cuisineType {
  "indian" = "indian",
  "north_indian" = "north_indian",
  "italian" = "italian",
  "chinese" = "chinese",
}

export enum foodType {
  "veg" = "veg",
  "non_veg" = "non_veg",
  "vegan" = "vegan",
}

export class RestaurantParamParamDto {
  @ApiProperty({
    description: "[restaurant id ] as uuid",
    example: "",
    required: true,
  })
  @IsUUID()
  public id!: string;
}

export class UpdateDishItemParamDto extends RestaurantParamParamDto {
  @ApiProperty({
    description: "[dish_id ] as uuid",
    example: "",
    required: true,
  })
  @IsUUID()
  public dish_id!: string;
}

export class CreateRestaurantDishBodyDto {
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
    description: "thumbnails",
    example: ["https://google.com/banner.png"],
    required: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  public thumbnails!: string[];
}

export class UpdateRestaurantDishBodyDto extends PartialType(
  CreateRestaurantDishBodyDto
) {}
