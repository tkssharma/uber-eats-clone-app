// Native.
import { format } from 'util';

// Package.
import debug from 'debug';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

// Internal.
import FileDAOService from './file.dao.service';
import { FileUploadURLsPayload } from './file.dto';

// Code.
const error = debug('files:error:model:files');
const verbose = debug('files:verbose:model:files');

@Injectable()
export class FileService {
  constructor(private readonly fileDaoService: FileDAOService) {}

  public async getSignedUrlForUpload(
    files: FileUploadURLsPayload[],
    user: any,
  ): Promise<any> {
    try {
      const response = [];
      const tag = ['getSignedUrlForUpload'];

      for (const file of files) {
        const originalName = file.file_name;
        const fileName = `${uuidv4()}-${originalName}`;
        const document = await this.fileDaoService.createPreSignedUrl(fileName);

        const documentUrlToFetch = await this.fileDaoService.getFileSignedUrl(
          originalName,
          fileName,
        );

        const fileResponse = await this.fileDaoService.create(
          {
            id: uuidv4(),
            size: '0',
            state: 'active',
            name: file.file_name,
            storage_unique_name: fileName,
            url: documentUrlToFetch,
            mimetype: file.mimetype,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          user,
        );
        response.push({
          ...fileResponse,
          id: fileResponse.id,
          success: true,
          document,
          document_originalname: originalName,
          document_unique_name: fileName,
        });
      }

      return response;
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }
  public async upload(
    user: any,
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    try {
      const response = [];
      const tag = ['upload'];
      verbose(`controller: %j`, files.length);

      for (const file of files) {
        const originalName = file.originalname;
        const fileName = `${uuidv4()}-${originalName}`;
        const document = await this.fileDaoService.upload(
          file.buffer,
          fileName,
          file.originalname,
        );
        console.log(document);

        const fileResponse = await this.fileDaoService.create(
          {
            id: uuidv4(),
            size: '0',
            state: 'active',
            name: file.originalname,
            storage_unique_name: document.Key,
            url: document.url,
            mimetype: file.mimetype,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          user,
        );
        verbose(`daoService: %j`, fileResponse);

        response.push({
          ...fileResponse,
          id: fileResponse.id,
          success: true,
        });
      }

      return response;
    } catch (err: any) {
      error(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
