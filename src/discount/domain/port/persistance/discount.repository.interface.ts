import { Order } from 'src/order/domain/entity/order.entity';
import { Discount } from '../../entity/discount.entity';

export interface DiscountRepositoryInterface {
  save(discount: Discount): Promise<Discount>;
  findByCode(code: string): Promise<Discount | null>;
}
