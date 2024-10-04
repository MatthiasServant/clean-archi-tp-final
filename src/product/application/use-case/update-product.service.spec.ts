import assert from "assert";
import { Product } from "../../domain/entity/product.entity";
import { ProductRepositoryInterface } from "../../domain/port/product.repository.interface";
import { UpdateProductService } from "./update-product.service";

export const fakeProduct = {
    name: 'Product 1',
    price: 10,
    description: 'Description',
  };

class ProductRepositoryFake {
  async save(product: Product): Promise<Product> {
    return product;
  }

  async findById(id: string): Promise<Product> {
    return new Product(fakeProduct);
  }
}

const productRepositoryFake =
  new ProductRepositoryFake() as ProductRepositoryInterface;

describe('UpdateProductService', () => {
    it('should modify the product details and save it', async () => {

        const updateProductService = new UpdateProductService(
            productRepositoryFake,
        );    
        
        const updatedProduct = await updateProductService.execute('1', {
            name: 'Product Updated',
            price: 200,
            description: 'Description Updated',
            stock: 20,
        });

        expect(updatedProduct).toEqual({
            name: 'Product Updated',
            price: 200,
            description: 'Description Updated',
            stock: 20,
            isActive: false,
        });  
    });
  });