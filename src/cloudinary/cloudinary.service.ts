import { Injectable, NotImplementedException } from '@nestjs/common';
import { rejects } from 'assert';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { resolve } from 'path';
import { v2 } from 'cloudinary';
@Injectable()
export class CloudinaryService {
  async uploadImage(
    url: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse > {
    return new Promise((resolve, rejects) => {
      let stream = v2.uploader.upload(url, (error, result) => {
        if (error) rejects(error);
        else resolve(result);
      });
    });
  }
}
