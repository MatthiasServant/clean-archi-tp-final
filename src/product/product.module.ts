import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./domain/entity/product.entity";
import ProductController from "./infrastructure/presentation/product.controller";
import ProductRepositoryTypeOrm from "./infrastructure/persistance/product.repository";
import { CreateProductService } from "./application/use-case/create-product.service";
import { ProductRepositoryInterface } from "./domain/port/product.repository.interface";
import OrderRepositoryTypeOrm from 'src/order/infrastructure/persistance/order.repository';
import { DeleteProductService } from './application/use-case/delete-product.service';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { UpdateProductService } from './application/use-case/update-product.service';
import { GetAllProductsService } from './application/use-case/get-all-products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
  
    providers: [
      ProductRepositoryTypeOrm,
      OrderRepositoryTypeOrm,
      {
        provide: CreateProductService,
        useFactory: (productRepository: ProductRepositoryInterface) => {
          return new CreateProductService(productRepository);
        },
        inject: [ProductRepositoryTypeOrm],
      },
      {
        provide: DeleteProductService,
        useFactory: (productRepository: ProductRepositoryInterface, orderRepository: OrderRepositoryInterface) => {
          return new DeleteProductService(productRepository, orderRepository);
        },
        inject: [ProductRepositoryTypeOrm, OrderRepositoryTypeOrm],
      },
      {
        provide: UpdateProductService,
        useFactory: (productRepository: ProductRepositoryInterface) => {
          return new UpdateProductService(productRepository);
        },
        inject: [ProductRepositoryTypeOrm],
      },
      {
        provide: GetAllProductsService,
        useFactory: (productRepository: ProductRepositoryInterface) => {
          return new GetAllProductsService(productRepository);
        },
        inject: [ProductRepositoryTypeOrm],
      },
    ],
  })
  export class ProductModule {}
  