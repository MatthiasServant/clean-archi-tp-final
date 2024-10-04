import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import DiscountController from './infrastructure/presentation/discount.controller';
import { Discount } from './domain/entity/discount.entity';
import DiscountRepositoryTypeOrm from './infrastructure/persistance/discount.repository';
import { CreateDiscountService } from './application/use-case/create-discount.service';
import { DiscountRepositoryInterface } from './domain/port/persistance/discount.repository.interface';

@Module({
    imports: [TypeOrmModule.forFeature([Discount])],
    controllers: [DiscountController],
  
    providers: [
      DiscountRepositoryTypeOrm,
      {
        provide: CreateDiscountService,
        useFactory: (discountRepository: DiscountRepositoryInterface) => {
          return new CreateDiscountService(discountRepository);
        },
        inject: [DiscountRepositoryTypeOrm],
      },
    ],
  })
  export class DiscountModule {}
  