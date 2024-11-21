import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { Catalog, QueryParams } from './product.model';
import { PAGE_SIZE } from 'src/common/const';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return product;
  }

  async findMany(params: QueryParams): Promise<Catalog> {
    const { sortKey, sortDirection, searchString, page } = params;

    const where = searchString
      ? {
          OR: [
            { title: { contains: searchString } },
            { description: { contains: searchString } },
            { article: { contains: searchString } },
          ],
        }
      : {};

    const orderBy =
      sortKey && sortDirection
        ? { [sortKey]: sortDirection }
        : { createdAt: Prisma.SortOrder.desc };

    const totalCount = await this.prisma.product.count({
      where,
    });

    const skip =
      !!page && Number(page) > 1 ? (Number(page) - 1) * PAGE_SIZE : 0;

    const data = await this.prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: PAGE_SIZE,
    });

    return { data, totalCount };
  }

  async createProduct(product: ProductDto): Promise<Product> {
    try {
      return this.prisma.product.create({
        data: product,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(
    id: Product['id'],
    product: Partial<Product>,
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: product,
    });
  }

  async deleteProduct(id: Product['id']): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
