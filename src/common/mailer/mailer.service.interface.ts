import { ItemDetailCommand } from "../../order/domain/entity/order-item.entity";

export interface MailerServiceInterface {
    execute(items: ItemDetailCommand[] | ItemDetailCommand): Promise<void>;
}