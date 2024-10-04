import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from 'src/product/domain/entity/product.entity';
import { ProductRepositoryInterface } from 'src/product/domain/port/product.repository.interface';
import { DataSource, Repository } from 'typeorm';

export default class ProductRepositoryTypeOrm
  extends Repository<Product>
  implements ProductRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Product, datasource.createEntityManager());
  }

  async findById(id: string): Promise<Product | null> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.id = :id', { id });

    return queryBuilder.getOne();
  }

  async findAll(active?: boolean): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('product');

    if (active !== undefined) {
      queryBuilder.where('product.active = :active', { active });
    }

    return queryBuilder.getMany();
  }

  async deleteProduct(id: string): Promise<void> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.id = :id', { id });

    await queryBuilder.delete().execute();
  }

  async findAndDeleteStock(id: string, quantity: number): Promise<Product> {
    const queryBuilder = this.createQueryBuilder('product');

    queryBuilder.where('product.id = :id', { id });

    const product = await queryBuilder.getOne();

    if (!product) {
      throw new Error('Product not found');
    }

    product.decrementStock(quantity);

    return await this.save(product);
  }
}
