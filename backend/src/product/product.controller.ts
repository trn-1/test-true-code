import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Catalog, QueryParams } from './product.model';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query() queryParams: QueryParams): Promise<Catalog> {
    return this.productService.findMany(queryParams);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateProduct(
    @Body() productDto: Partial<Product>,
    @Param('id') id: string,
  ) {
    return this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
