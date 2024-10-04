import { Discount } from "../../domain/entity/discount.entity";
import { DiscountRepositoryInterface } from "../../domain/port/persistance/discount.repository.interface";
import { CreateDiscountService } from "./create-discount.service";


class DiscountRepositoryFake {
  async save(discount: Discount): Promise<Discount> {
    return discount;
  }
}

const discountRepositoryFake =
  new DiscountRepositoryFake() as DiscountRepositoryInterface;

describe("a discount can't be created if name is missing", () => {
  it('should return an error', async () => {
    const createDiscountService = new CreateDiscountService(
      discountRepositoryFake,
    );
    await expect(
      createDiscountService.execute({
        code: 'code',
        name: '',
      }),
    ).rejects.toThrow();
  });
});