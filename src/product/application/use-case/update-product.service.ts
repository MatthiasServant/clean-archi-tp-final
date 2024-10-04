import { Product, UpdateProduct } from "../../domain/entity/product.entity";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";

export class UpdateProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(id: string, updateProduct: UpdateProduct): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.update(updateProduct);

    return await this.productRepository.save(product);
  }
}
