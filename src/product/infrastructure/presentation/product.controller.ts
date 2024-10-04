import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductService } from 'src/product/application/use-case/create-product.service';
import { DeleteProductService } from 'src/product/application/use-case/delete-product.service';
import { UpdateProductService } from 'src/product/application/use-case/update-product.service';
import { GetAllProductsService } from 'src/product/application/use-case/get-all-products.service';
import { CreateProduct, Product, UpdateProduct } from 'src/product/domain/entity/product.entity';

@Controller('/products')
export default class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly getAllProductsService: GetAllProductsService
  ) {}

  @Post()
  async createOrder(
    @Body() createProduct: CreateProduct,
  ): Promise<Product> {
    return this.createProductService.execute(createProduct);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return this.deleteProductService.execute(id);
  }

  @Put(':id')
  async updateOrder(
      @Param('id') id: string,
      @Body() updateProduct: UpdateProduct,
  ): Promise<Product> {
    return this.updateProductService.execute(id, updateProduct);
  }

  @Get(':active')
  async listOrders(@Param('active') active?: boolean): Promise<Product[]> {
    return this.getAllProductsService.execute(active);
  }
}
