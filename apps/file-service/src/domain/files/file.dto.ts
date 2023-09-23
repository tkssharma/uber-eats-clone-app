import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsDefined,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class FileUploadURLsPayload {
  @ApiProperty({
    description: 'filename',
    required: true,
    example: 'document.pdf',
  })
  @IsDefined()
  @IsString()
  public file_name!: string;

  @ApiProperty({
    description: 'file mimetype',
    required: true,
    example: 'application/pdf',
  })
  @IsDefined()
  @IsString()
  public mimetype!: string;
}

export class FilesCreateResponse {
  @ApiResponseProperty({
    example: 'da9b9f51-23b8-4642-97f7-52537b3cf53b',
    format: 'v4',
  })
  id: string;

  @ApiResponseProperty({
    example: 'da9b9f51-23b8-4642-97f7-52537b3cf53b',
    format: 'v4',
  })
  created_by: string;

  @ApiResponseProperty({
    example: 'hello.pdf',
  })
  name: string;

  @ApiResponseProperty({
    example: 48000,
  })
  size: number;

  @ApiResponseProperty({
    example: '3af2966b-c792-449a-ba8b-c1007ca4e98e-ll.svg',
  })
  storage_unique_name: string;

  @ApiResponseProperty({
    example: 'application/pdf',
  })
  mimetype: string;

  @ApiResponseProperty({
    example: true,
  })
  success: boolean;
}
