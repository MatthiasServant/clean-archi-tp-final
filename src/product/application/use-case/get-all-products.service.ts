import { CreateProduct, Product, UpdateProduct } from "src/product/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/product/domain/port/product.repository.interface";

export class GetAllProductsService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(active?: boolean): Promise<Product[]> {
    try {
      return await this.productRepository.findAll(active);
    } catch (e) {
      throw new Error('Impossible de récupérer les produits');
    }
  }
}
