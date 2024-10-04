import { DiscountRepositoryInterface } from 'src/discount/domain/port/persistance/discount.repository.interface';
import { CreateOrderCommand, Order } from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';
import { MailerServiceInterface } from 'src/common/mailer/mailer.service.interface';

export class CreateOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface, private readonly discountRepository: DiscountRepositoryInterface, private readonly domainService: MailerServiceInterface) {}

  async execute(createOrderCommand: CreateOrderCommand): Promise<Order> {
    const order = new Order(createOrderCommand);
    this.domainService.execute(order.orderItems);
    if(createOrderCommand.promoCode) {
      const discount = await this.discountRepository.findByCode(createOrderCommand.promoCode);
      order.applyDiscount(discount);
    }
    
    return await this.orderRepository.save(order);
  }
}
