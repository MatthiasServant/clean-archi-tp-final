import { Product } from "../../domain/entity/product.entity";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";
import { CreateProductService } from "./create-product.service";
import { fakeProduct } from "./create-product.service.spec";
import { GetAllProductsService } from "./get-all-products.service";

const fakeActiveProduct = {
    name: 'Product 1',
    price: 10,
    description: 'Description',
    isActive: true,
  };

class ProductRepositoryFake {
  async findAll(isActive?: boolean): Promise<Product[]> {
    if(!isActive) {
      return [fakeProduct, fakeActiveProduct] as unknown as Product[];
    } else {
      return [fakeActiveProduct] as unknown as Product[];
    }
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as ProductRepositoryInterface;

describe("GetAllProducts", () => {
  it('should get all products', async () => {
    const getAllProductsService = new GetAllProductsService(
        productRepositoryFake,
    );

    const products = await getAllProductsService.execute();

    expect(products).toEqual([fakeProduct, fakeActiveProduct]);
  });

  it('should get all active products', async () => {
    const getAllProductsService = new GetAllProductsService(
        productRepositoryFake,
    );

    const products = await getAllProductsService.execute(true);

    expect(products).toEqual([fakeActiveProduct]);
  });
});