import { CreateProduct, Product } from "../../domain/entity/product.entity";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";

export class CreateProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(createProduct: CreateProduct): Promise<Product> {
    const product = new Product(createProduct);

    return await this.productRepository.save(product);
  }
}
