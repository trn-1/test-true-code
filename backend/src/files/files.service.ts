import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { promises as fs } from 'fs';
import { join } from 'path';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class FilesService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads');

  constructor(private readonly productService: ProductService) {}

  async uploadFile(id: Product['id'], file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл отсутствует');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Неверный тип');
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('Файл слишком большой');
    }

    const lastDotIndex = file.originalname.lastIndexOf('.');
    const postfix =
      lastDotIndex !== -1 ? file.originalname.substring(lastDotIndex) : '';
    const uploadFileName = `${Date.now()}${postfix}`;

    await this.productService.updateProduct(id, {
      photoPath: uploadFileName,
    });

    await fs.mkdir(this.uploadPath, { recursive: true });
    await fs.rename(file.path, join(this.uploadPath, uploadFileName));
  }

  async deleteFile(filename: string) {
    try {
      await fs.unlink(join(this.uploadPath, filename));
      return { success: true };
    } catch (err) {
      return { success: false, error: `${err.message}` };
    }
  }
}