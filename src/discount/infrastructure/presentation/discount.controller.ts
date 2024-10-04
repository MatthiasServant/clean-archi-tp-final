import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateOrderService } from 'src/order/application/use-case/create-order.service';
import { PayOrderService } from 'src/order/application/use-case/pay-order.service';
import { CreateDiscountService } from 'src/discount/application/use-case/create-discount.service';
import { CreateDiscount, Discount } from 'src/discount/domain/entity/discount.entity';

@Controller('/discounts')
export default class DiscountController {
  constructor(
    private readonly createDiscountService: CreateDiscountService,
  ) {}

  @Post()
  async createDiscount(
    @Body() createDiscount: CreateDiscount,
  ): Promise<Discount> {
    return this.createDiscountService.execute(createDiscount);
  }
}
