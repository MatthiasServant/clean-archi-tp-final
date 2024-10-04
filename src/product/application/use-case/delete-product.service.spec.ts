import { Order, OrderStatus } from "../../../order/domain/entity/order.entity";
import { Product } from "../../domain/entity/product.entity";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";
import { DeleteProductService } from "./delete-product.service";
import { fakeProduct } from "./create-product.service.spec";
import { OrderRepositoryInterface } from "../../../order/domain/port/persistance/order.repository.interface";

export const fakeOrder = {
    id: '1',
    price: 100,
    orderItems: [fakeProduct],
    createdAt: new Date(),
    customerName: 'Customer 1',
    shippingAddress: 'Address 1',
    invoiceAddress: 'Address 2',
    status: OrderStatus.PENDING,
}

class ProductRepositoryFake {
  async save(product: Product): Promise<Product> {
    return product;
  }
}

class OrderRepositoryFake {
  async findByProductId(productId: string): Promise<Order[]> {
    return [fakeOrder as unknown as Order];
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as ProductRepositoryInterface;

const orderRepositoryFake =
    new OrderRepositoryFake() as OrderRepositoryInterface;

describe("DeleteProductService", () => {
  it('should not delete product when it is already part of an order', async () => {
    const createProductService = new DeleteProductService(
        productRepositoryFake, orderRepositoryFake
    );

    await expect(
        createProductService.execute('1'),
      ).rejects.toThrow();

  });
});