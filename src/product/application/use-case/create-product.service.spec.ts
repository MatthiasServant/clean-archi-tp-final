import { Product } from "../../domain/entity/product.entity";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";
import { CreateProductService } from "./create-product.service";

export const fakeProduct = {
    name: 'Product 1',
    price: 10,
    description: 'Description',
  };

class ProductRepositoryFake {
  async save(product: Product): Promise<Product> {
    return product;
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as ProductRepositoryInterface;

describe("CreateProductService", () => {
  it('should create product and set default values', async () => {
    const createProductService = new CreateProductService(
        productRepositoryFake,
    );

    const product = await createProductService.execute(fakeProduct);

    expect(product).toEqual({...fakeProduct, stock: Product.DEFAULT_STOCK, isActive: Product.DEFAULT_ACTIVE});
  });
});