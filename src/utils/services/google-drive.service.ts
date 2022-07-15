import { Injectable } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';
import { Readable } from 'stream';

@Injectable()
export class GoogleDriveService {
  private drive: drive_v3.Drive;

  constructor() {
    this.createDrive();
  }

  async generateImageUrl(file: Express.Multer.File) {
    if (!file) {
      return;
    } else {
      const loadedFileId = await this.uploadImage(
        file.originalname,
        file.buffer,
      );
      return this.generateUrl(loadedFileId);
    }
  }

  private async uploadImage(
    fileName: string,
    fileBuffer: Buffer,
  ): Promise<string> {
    try {
      const loadedFileRaw = await this.drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: 'image/*',
        },
        media: {
          mimeType: 'image/*',
          body: Readable.from(fileBuffer.toString()),
        },
      });

      return loadedFileRaw.data.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private async generateUrl(fileId: string): Promise<string> {
    try {
      await this.drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
      const generatedUrlRaw = await this.drive.files.get({
        fileId,
        fields: 'webContentLink',
      });
      return generatedUrlRaw.data.webContentLink;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private createDrive() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REFRESH_TOKEN,
    );
    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    this.drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });
  }
}
