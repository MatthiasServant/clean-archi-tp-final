import { Product } from "../entity/product.entity";

export interface ProductRepositoryInterface {
  save(order: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(active?: boolean): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
  findAndDeleteStock(id: string, quantity: number): Promise<Product>;
}
