import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileData } from '@prisma/client';
import { AWSS3Service } from '@eats/aws-s3';
import { AwsS3ClientService, InjectAwsS3Client } from '@eats/aws-s3-dynamic';

@Injectable()
export default class FileDaoService {
  constructor(
    @InjectAwsS3Client()
    public readonly awss3Client: AwsS3ClientService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(payload: FileData, user: any): Promise<any | Error | undefined> {
    const data = this.prismaService.fileData.create({
      data: {
        ...payload,
      },
    });
    return data;
  }

  async getFileSignedUrl(fileName: string, fileUniqueName: string) {
    const response = await this.awss3Client.getPresignedUrl(
      fileUniqueName,
      fileName,
    );
    return response;
  }
  async upload(file: Buffer, key: string, originalname: string) {
    return this.awss3Client.upload(file, key, originalname);
  }
  async createPreSignedUrl(fileName: string) {
    try {
      const document = await this.awss3Client.createPresignedUrl(fileName);
      return document;
    } catch (err) {
      return err;
    }
  }
}
