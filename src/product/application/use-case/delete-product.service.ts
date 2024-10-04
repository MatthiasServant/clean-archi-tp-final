import { OrderRepositoryInterface } from "../../../order/domain/port/persistance/order.repository.interface";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";

export class DeleteProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface, private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const ordersWithProduct = await this.orderRepository.findByProductId(id);

    if (ordersWithProduct.length > 0) {
      throw new Error(
        'Impossible de supprimer le produit car il est utilisé dans des commandes',
      );
    }

    try {
      await this.productRepository.deleteProduct(id);
    } catch (e) {
      throw new Error('Impossible de supprimer le produit');
    }
  }
}
