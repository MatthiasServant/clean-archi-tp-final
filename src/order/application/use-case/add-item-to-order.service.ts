import { NotFoundException } from '@nestjs/common';
import { MailerServiceInterface } from 'src/common/port/persistance/mailer/mailer.service.interface';
import { ItemDetailCommand } from 'src/order/domain/entity/order-item.entity';
import { Order } from 'src/order/domain/entity/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';

export class AddItemToOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface, private readonly mailerService: MailerServiceInterface) {}

  public async execute(orderId: string, orderItem: ItemDetailCommand): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Pas de commande');
    }

    order.addItem(orderItem);
    this.mailerService.execute(orderItem);
    return this.orderRepository.save(order);
  }
}
