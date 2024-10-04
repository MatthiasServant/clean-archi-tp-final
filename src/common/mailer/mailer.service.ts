import { ItemDetailCommand } from "src/order/domain/entity/order-item.entity";
import { ProductRepositoryInterface } from "../../product/domain/port/product.repository.interface";
import { MailerServiceInterface } from "../mailer/mailer.service.interface";

export class MailerService implements MailerServiceInterface {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}
  
    async execute(items: ItemDetailCommand[] | ItemDetailCommand): Promise<void> {
        this.updateProductsStock(items);
        return Promise.resolve();
    }

    private async updateProductsStock(items: ItemDetailCommand[] | ItemDetailCommand): Promise<void> {
        if(!Array.isArray(items)) {
            items = [items];
        }
        for(const item of items) {
            const product = await this.productRepository.findAndDeleteStock(item.product.id, item.quantity);
            if(product.getStock() === 0) {
                console.log('Send email to admin');
            }
        }
        return Promise.resolve();
    }
  }
  