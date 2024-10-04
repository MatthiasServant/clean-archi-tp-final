import { CreateDiscount, Discount } from "../../domain/entity/discount.entity";
import { DiscountRepositoryInterface } from "../../domain/port/persistance/discount.repository.interface";

export class CreateDiscountService {
  constructor(private readonly discountRepository: DiscountRepositoryInterface) {}

  async execute(createDiscount: CreateDiscount): Promise<Discount> {
    const discount = new Discount(createDiscount);

    return await this.discountRepository.save(discount);
  }
}
