import { InjectDataSource } from '@nestjs/typeorm';
import { Discount } from 'src/discount/domain/entity/discount.entity';
import { DiscountRepositoryInterface } from 'src/discount/domain/port/persistance/discount.repository.interface';
import { DataSource, Repository } from 'typeorm';

export default class DiscountRepositoryTypeOrm
  extends Repository<Discount>
  implements DiscountRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Discount, datasource.createEntityManager());
  }

  async findByCode(code: string): Promise<Discount | null> {
    const queryBuilder = this.createQueryBuilder('discount');

    queryBuilder.where('discount.code = :code', { code });

    return queryBuilder.getOne();
  }
}
