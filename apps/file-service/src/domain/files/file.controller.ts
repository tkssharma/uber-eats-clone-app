import { Controller } from '@nestjs/common';
// Native.
import { format } from 'util';

// Package.
import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import debug from 'debug';
import { RolesGuard } from '../auth/guards/role-guard';
import {
  RESULTS_RETURNED,
  ENTITY_MODIFIED,
  PARAMETERS_FAILED_VALIDATION,
} from '../app.constants';
import { User, UserMetaData } from '../auth/guards/user';
import { FileUploadURLsPayload, FilesCreateResponse } from './file.dto';
import { FileService } from './file.service';
import { uploadFiles } from './file.decorator';
// Code.
const error = debug('files:error:model:files');
const verbose = debug('files:verbose:model:files');

@ApiBearerAuth('authorization')
@Controller('files')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('files')
@UseGuards(RolesGuard)
@Controller('files')
export class FileController {
  constructor(private readonly service: FileService) {}

  // upload files

  @ApiTags('files')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @uploadFiles('filename')
  @UseInterceptors(FilesInterceptor('filename'))
  @ApiCreatedResponse({
    type: [FilesCreateResponse],
    description: 'returns list of all success and failures of file uploads',
  })
  @Post()
  public async uploadFiles(
    @User() user: UserMetaData,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      return await this.service.upload(user, files);
    } catch (err) {
      throw err;
    }
  }

  @ApiTags('files')
  @ApiOperation({
    description: 'Get pre-signed url for document for external id ',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: RESULTS_RETURNED })
  @ApiAcceptedResponse({ description: ENTITY_MODIFIED })
  @ApiBadRequestResponse({ description: PARAMETERS_FAILED_VALIDATION })
  @Post('/signed-url')
  public async uploadUrl(
    @Body() payload: FileUploadURLsPayload[],
    @User() user: UserMetaData,
  ) {
    try {
      return await this.service.getSignedUrlForUpload(payload, user);
    } catch (err) {
      throw err;
    }
  }
}
