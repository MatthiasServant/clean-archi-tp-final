import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from './infrastructure/presentation/order.controller';
import { Order } from './domain/entity/order.entity';
import { OrderItem } from './domain/entity/order-item.entity';
import { CreateOrderService } from 'src/order/application/use-case/create-order.service';
import { PayOrderService } from 'src/order/application/use-case/pay-order.service';
import { CancelOrderService } from 'src/order/application/use-case/cancel-order.service';
import { SetInvoiceAddressOrderService } from 'src/order/application/use-case/set-invoice-address-order.service';
import { SetShippingAddressOrderService } from 'src/order/application/use-case/set-shipping-address-order.service';
import OrderRepositoryTypeOrm from 'src/order/infrastructure/persistance/order.repository';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';
import { GenerateInvoiceService } from 'src/order/application/use-case/generate-invoice.service';
import { PdfGeneratorServiceInterface } from 'src/common/pdf/pdf-generator.service.interface';
import { PdfGeneratorService } from 'src/common/pdf/pdf-generator.service';
import { MailerServiceInterface } from '../common/mailer/mailer.service.interface';
import { AddItemToOrderService } from './application/use-case/add-item-to-order.service';
import { DiscountRepositoryInterface } from 'src/discount/domain/port/persistance/discount.repository.interface';
import DiscountRepositoryTypeOrm from 'src/discount/infrastructure/persistance/discount.repository';
import { MailerService } from 'src/common/mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],

  providers: [
    OrderRepositoryTypeOrm,
    PdfGeneratorService,
    DiscountRepositoryTypeOrm,
    MailerService,
    {
      provide: GenerateInvoiceService,
      useFactory: (
        orderRepository: OrderRepositoryInterface,
        pdfGeneratorService: PdfGeneratorServiceInterface,
      ) => {
        return new GenerateInvoiceService(orderRepository, pdfGeneratorService);
      },
      inject: [OrderRepositoryTypeOrm, PdfGeneratorService],
    },

    {
      provide: PayOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new PayOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetInvoiceAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetInvoiceAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide: SetShippingAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetShippingAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    // pour pouvoir gérer l'inversion de dépendance
    // du service CreateOrderService
    // j'utilise le système de useFactory de nest
    {
      // quand j'enregistre la classe CreateOrderService
      provide: CreateOrderService,
      // je demande à Nest Js de créer une instance de cette classe
      useFactory: (orderRepository: OrderRepositoryInterface, discountRepository: DiscountRepositoryInterface, mailerService: MailerServiceInterface) => {
        return new CreateOrderService(orderRepository, discountRepository, mailerService);
      },
      // en lui injectant une instance de OrderRepositoryTypeOrm
      // à la place de l'interface qui est utilisée dans le constructeur de CreateOrderService
      inject: [OrderRepositoryTypeOrm, MailerService],
    },
    {
      provide: AddItemToOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface, mailerService: MailerServiceInterface) => {
        return new AddItemToOrderService(orderRepository, mailerService);
      },
      inject: [OrderRepositoryTypeOrm, MailerService],
    },
  ],
})
export class OrderModule {}
