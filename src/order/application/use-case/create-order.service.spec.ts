import { CreateOrderService } from '../use-case/create-order.service';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { Order } from '../../domain/entity/order.entity';
import { Product } from 'src/product/domain/entity/product.entity';
import { ProductRepositoryInterface } from 'src/product/domain/port/product.repository.interface';
import { DiscountRepositoryInterface } from 'src/discount/domain/port/persistance/discount.repository.interface';

const fakeProduct = {
  id: '1',
  name: 'Product 1',
  price: 10,
  description: 'Description',
};

class OrderRepositoryFake {
  async save(order: Order): Promise<Order> {
    return order;
  }
}

class ProductRepositoryFake {
  async findById(id: string): Promise<Product> {
    return new Product(fakeProduct);
  }
}

class DiscountRepositoryFake {
  async findByCode(code: string): Promise<any> {
    return;
  }
}

class MailerServiceFake {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly productRepository: ProductRepositoryInterface,
  ) {}
  async execute(orderItems: any): Promise<void> {
    return;
  }
  private async updateProductsStock(orderItems: any): Promise<void> {
    return;
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as ProductRepositoryInterface;

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

const mailerServiceFake =
  new MailerServiceFake(orderRepositoryFake, productRepositoryFake) as MailerServiceFake;

const discountRepositoryFake =
  new DiscountRepositoryFake() as DiscountRepositoryInterface;

  describe("an order can't be created if the order have more than 5 item", () => {
  it('should return an error', async () => {
    const createOrderService = new CreateOrderService(orderRepositoryFake, discountRepositoryFake, mailerServiceFake);
    const product = new Product(fakeProduct);

    await expect(
      createOrderService.execute({
        customerName: 'John Doe',
        items: [
          { quantity: 1, product: product },
          { quantity: 1, product: product },
          { quantity: 1, product: product },
          { quantity: 1, product: product },
          { quantity: 1, product: product },
          { quantity: 1, product: product },
        ],
        shippingAddress: 'Shipping Address',
        invoiceAddress: 'Invoice Address',
      }),
    ).rejects.toThrow();
  });
});
